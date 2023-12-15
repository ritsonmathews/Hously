const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const autoIncrement=require("mongoose-sequence")(mongoose)

const applicationSchema = new mongoose.Schema(
  {
    applicationNumber:{
      type:Number,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
    },
    resume: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      trim: true,
    },
    jobDetails: {
      title: {
        type: String,
        required: true,
      },
      Salary: {
        type: String,
        required: true,
      },
      domain: {
        type: String,
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
    },
    programId: {
      type: ObjectId,
      ref: "Internship",
      required: true,
      trim: true,
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

applicationSchema.plugin(autoIncrement,{inc_field:"applicationNumber",start_seq:20220000})


module.exports = mongoose.model("Application", applicationSchema);
