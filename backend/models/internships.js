const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const autoIncrement=require("mongoose-sequence")(mongoose)

const internshipSchema = new mongoose.Schema(
  {
    programNumber:Number,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    Salary: {
      type: String,
    },
    gender: {
      type:String,
      default:"Male",
      enum:["Male","Female"]
    },
    language: {
      type: String,
      required: true,
    },
    place:{
      type:String,
      required:true
    },
    domain: {
      type: ObjectId,
      ref: "Domain",
      required: true,
    },
    adminId: {
      type: ObjectId,
      ref: "Admin",
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

internshipSchema.plugin(autoIncrement,{inc_field:"programNumber",start_seq:100})

module.exports = mongoose.model("Internship", internshipSchema);
