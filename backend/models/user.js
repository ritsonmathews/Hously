const mongoose = require("mongoose");
const crypto = require("crypto");
const autoIncrement=require("mongoose-sequence")(mongoose)

const userSchema = new mongoose.Schema(
  {
    userNumber:Number,
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    salt: String,
    role: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Deactivated", "Blocked"],
    },
    tokens: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.plugin(autoIncrement,{inc_field:"userNumber",start_seq:100000})

// // Method to check the entered password is correct or not
userSchema.methods.validPassword = (password) => {
  var password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.password === password;
};

userSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};
module.exports = mongoose.model("User", userSchema);
