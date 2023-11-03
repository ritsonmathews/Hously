const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
    default: "0",
  },
  dob: {
    type: Date,
  },
  profileStatus:{
    type: String,
    default:"ENABLED",
    enum : ["BANNED", "ENABLED","DISABLED"],
  },
  role:{
     type: String,
     default: "USER",
     enum:["USER","ADMIN"]
  }
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
