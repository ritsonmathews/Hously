const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domainName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Domain", domainSchema);
