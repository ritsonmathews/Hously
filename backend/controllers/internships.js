const Internship = require("../models/internships");

// For provider to post new internships
exports.addInternship = (req, res) => {
  const data = req.body;
  const internship = new Internship({
    ...data,
    adminId: req.admin._id,
  });
  internship.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ data });
  });
};

// Middleware internship by ID
exports.internshipById = (req, res, next, id) => {
  Internship.findById(id)
  .populate("domain")
  .exec((err, internship) => {
    if (err || !internship) {
      return res.status(400).json({
        error: "Internship not found",
      });
    }
    req.internship = internship;
    next();
  });
};

// For provider to remove internship
exports.removeInternship = (req, res) => {
  const internship = req.internship;
  internship.remove((error, deletedInternship) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({
      message: "Internship removed Succesfully",
    });
  });
};

// For provider to update internship details
exports.updateInternship = (req, res) => {
  Internship.findOneAndUpdate(
    { _id: req.internship._id },
    { $set: req.body },
    { new: true },
    (err, internship) => {
      if (err || !internship) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(internship);
    }
  );
};

// To see the internship details
exports.read = (req, res) => {
  return res.json(req.internship);
};

// See all the Progrms
exports.listPrograms = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  Internship.find({})
    .populate("domain")
    .sort([[sortBy, order]])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

// See all the internships/Trainings posted by a provider
exports.listAllPrograms = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  Internship.find({ userId: req.user._id })
    .populate("domain")
    .sort([[sortBy, order]])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};
// See all Sorted internships (Free/Paid) posted by a provider
exports.listInternships = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  let type = req.query.type ? req.query.type : null;
  Internship.find({ userId: req.user._id, type: "Internship", feesType: type })
    .populate("domain")
    .sort([[sortBy, order]])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

// See all the Trainings posted by a provider
exports.listTrainings = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  let type = req.query.type ? req.query.type : null;
  Internship.find({ userId: req.user._id, type: "Training", feesType: type })
    .populate("domain")
    .sort([[sortBy, order]])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

// For Seeker to see all active internships
exports.listAllInternships = (req, res) => {
  Internship.find(
    { status: "Active", type: "Internship" },
    { status: 0, userId: 0 }
  )
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ data });
    });
};

// For Seeker to see all active free internships
exports.listAllFreeInternships = (req, res) => {
  Internship.find(
    { status: "Active", type: "Internship", feesType: "Free" },
    { status: 0, userId: 0 }
  )
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ data });
    });
};

// For Seeker to see all active paid internships
exports.listAllPaidInternships = (req, res) => {
  Internship.find(
    { status: "Active", type: "Internship", feesType: "Paid" },
    { status: 0, userId: 0 }
  )
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ data });
    });
};

// For Seeker to see all active trainings
exports.listAllTrainings = (req, res) => {
  Internship.find(
    { status: "Active", type: "Training" },
    { status: 0, userId: 0 }
  )
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ data });
    });
};

// For Seeker to see all active free trainings
exports.listAllFreeTrainings = (req, res) => {
  Internship.find(
    { status: "Active", type: "Training", feesType: "Free" },
    { status: 0, userId: 0 }
  )
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ data });
    });
};

// For Seeker to see all active paid trainings
exports.listAllPaidTrainings = (req, res) => {
  Internship.find(
    { status: "Active", type: "Training", feesType: "Paid" },
    { status: 0, userId: 0 }
  )
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ data });
    });
};

// For admin to see all the internships
exports.viewAllInternships = (req, res) => {
  Internship.find({ type: "Internship" })
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

// For admin to see all the trainings
exports.viewAllTrainings = (req, res) => {
  Internship.find({ type: "Training" })
    .populate("domain")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};

// Return the status values
exports.internshipStatusValues = (req, res) => {
  res.json(Internship.schema.path("status").enumValues);
};

// Return Worktype values
exports.internshipWorkTypeValues = (req, res) => {
  res.json(Internship.schema.path("workType").enumValues);
};

// Return the type values
exports.internshipTypeValues = (req, res) => {
  res.json(Internship.schema.path("type").enumValues);
};

exports.genderValues = (req, res) => {
  try {
    const enumValues = Internship.schema.path("gender").enumValues;
    res.json(enumValues);
  } catch (error) {
    console.error("Error while getting gender types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Return the fees-type values
exports.internshipFeesTypeValues = (req, res) => {
  res.json(Internship.schema.path("feesType").enumValues);
};

// For provider to update internship status
exports.updateInternshipStatus = (req, res) => {
  Internship.findOneAndUpdate(
    { _id: req.internship._id },
    { $set: { status: req.body.status } },
    (err, internship) => {
      if (err || !internship) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({ internship });
    }
  );
};

// Program Search
exports.programSearch = (req, res) => {
  const regex = new RegExp(req.query.name, "i");
  Internship.find({ companyName: regex })
    .populate("domain")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Program not found",
        });
      }
      res.status(200).json(result);
    });
};

// Data Management
exports.listProgramsData = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  let type = req.query.type ? req.query.type : null;
  let fees = req.query.fees ? req.query.fees : null;
  Internship.find({ userId: req.user._id, type: type, feesType: fees })
    .populate("domain")
    .sort([[sortBy, order]])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};
exports.listSortedProgramsData = (req, res) => {
  console.log(req.query);
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  let type = req.query.type ? req.query.type : null;
  let fees = req.query.fees ? req.query.fees : null;
  let status = req.query.status ? req.query.status : null;
  Internship.find({ userId: req.user._id, type: type, feesType: fees,status:status })
    .populate("domain")
    .sort([[sortBy, order]])
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
};
