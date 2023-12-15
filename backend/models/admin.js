const mongoose = require("mongoose");
const crypto=require("crypto")
const autoIncrement=require("mongoose-sequence")(mongoose)    

const adminSchema = new mongoose.Schema(
  {
    adminNumber:Number,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: [true,"Username already exists"]
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role:{
      type:String,
      default:"User",
      enum:["Admin","User"]
    },
    status:{
      type:String,
      default:"Active",
      enum:["Active","Blocked"]
    },
    salt: String,
  },
  { timestamps: true }
);

adminSchema.plugin(autoIncrement,{inc_field:"adminNumber"})

// // Method to check the entered password is correct or not
adminSchema.methods.validPassword = (password,salt,passwordData) => {
  var password = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return passwordData === password;
};

adminSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing Admin's salt and password with 1000 iterations,
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

module.exports = mongoose.model("Admin", adminSchema);
