const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true
  },
});

const ServiceModel = mongoose.model("Service", serviceSchema);

module.exports = ServiceModel;
