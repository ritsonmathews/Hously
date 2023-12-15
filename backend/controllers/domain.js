const Domain = require("../models/domain");

// Add Domain
exports.addDomain = (req, res) => {
  const domain = new Domain(req.body);

  domain.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ data });
  });
};

// List all Domain
exports.listDomain = (req, res) => {
  Domain.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
// Delete Domain
exports.deleteDomain = (req, res) => {
  const domain = req.domain;
  domain.remove((error, deletedDomain) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({
      message: "Domain deleted Succesfully",
    });
  });
};

// Middleware Domain by ID
exports.domainById = (req, res, next, id) => {
  Domain.findById(id).exec((err, domain) => {
    if (err || !domain) {
      return res.status(400).json({
        error: "Domain not found",
      });
    }
    req.domain = domain;
    next();
  });
};
