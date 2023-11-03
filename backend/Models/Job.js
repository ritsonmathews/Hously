const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  location: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const JobModel = mongoose.model("Job", jobSchema);

module.exports = JobModel;
