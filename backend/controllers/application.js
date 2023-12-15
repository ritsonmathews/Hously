const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Application = require("../models/application");

//Create new application
exports.createApplication = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensioms = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "File cannot be uploaded",
      });
    }

    // const {name,domain,email,mobile,companyName}=fields
    // if(!name||!domain||!email||!mobile||!companyName){
    //   return res.status(400).json({
    //     error:"All fields are required"
    //   })
    // }

    const data = {
      ...fields,
      programId: req.internship._id,
      adminId: req.admin._id,
    };
    console.log("data", data);

    const { name, email, mobile, title, domain, place,Salary,language,adminId,programId } = data;
    let application = new Application({
      name,
      email,
      mobile,
      jobDetails: { title, domain, place,Salary,language },
      adminId,
      programId
    });
    if (files.resume) {
      application.resume.data = fs.readFileSync(files.resume.filepath);
      application.resume.contentType = files.resume.type;
    }
    application.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
  });
};

//Application by id (Middleware)
exports.applicationById = (req, res, next, id) => {
  Application.findById(id).exec((err, application) => {
    if (err || !application) {
      return res.status(400).json({
        error: "Application not found",
      });
    }
    req.application = application;
    next();
  });
};

// update Application
exports.updateApplication = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensioms = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "File cannot be apploaded",
      });
    }
    const { name, domain, email, mobile, companyName } = fields;
    let application = req.application;
    application = _.extend(application, {
      name,
      domain,
      email,
      mobile,
      companyName,
    });

    if (files.resume) {
      application.resume.data = fs.readFileSync(files.resume.filepath);
      application.resume.contentType = files.resume.type;
    }
    application.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "error",
        });
      }
      res.json(data);
    });
  });
};

//Read an application
exports.readOne = (req, res) => {
  req.application.resume = undefined;
  return res.json(req.application);
};

//List Application Submitted by a user
exports.listUserApplications = (req, res) => {
  Application.find({ userId: req.user._id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

//Read resume
exports.resume = (req, res, next) => {
  if (req.application.resume.data) {
    res.set("Content-Type", req.application.resume.contentType);
    return res.send(req.application.resume.data);
  } else {
    return res.status(400).json({
      error: "Resume not found",
    });
  }
  next();
};

//remove application
exports.removeApplication = (req, res) => {
  let application = req.application;
  application.remove((err, deletedData) => {
    if (err) {
      return res.status(400).json({
        error: "Error while deleting Application",
      });
    }
    res.json({
      message: "Application deleted succesfully",
    });
  });
};

// search application
exports.searchApplication = (req, res) => {
  const regex = new RegExp(req.query.name, "i");
  Application.find({ name: regex }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json(result);
  });
};

// ------------------------Provider Only------------------------

//List all applications of a particular intership (Provider only)
exports.listInternshipApplications = (req, res) => {
  let programid = req.internship._id;
  Application.find({ programId: programid }, { resume: 0 }).exec(
    (err, applications) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(applications);
    }
  );
};

// update Application (Provider only)
exports.updateApplicationByProvider = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensioms = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "File cannot be apploaded",
      });
    }

    const { status } = fields;
    let application = req.application;
    application = _.extend(application, { status });

    application.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "error",
        });
      }
      res.json(data);
    });
  });
};

// -------------------------Admin Only------------------------

//List all Applications (Admin only)
exports.listAllApplications = (req, res) => {
  Application.find({}, { resume: 0 }).exec((err, applications) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(applications);
  });
};

// update Application (Admin only)
exports.updateApplicationByAdmin = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensioms = true;
  form.parse(req, (err, fields, files) => {
    console.log(form);
    if (err) {
      return res.status(400).json({
        error: "File cannot be uploaded",
      });
    }
    let application = req.application;
    application = _.extend(application, fields);

    if (files.resume) {
      application.resume.data = fs.readFileSync(files.resume.filepath);
      application.resume.contentType = files.resume.type;
    }
    application.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "error",
        });
      }
      res.json(data);
    });
  });
};

// ------------------------Provider and Admin------------------------

//Get status values (Provider and Admin)
exports.getStatusValues = (req, res) => {
  res.json(Application.schema.path("status").enumValues);
};

//List all Applications of a user (Provider and Admin)
exports.listApplicationsByUser = (req, res) => {
  let userid = req.user;
  Application.find({ userId: userid }, { resume: 0 }).exec(
    (err, applications) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(applications);
    }
  );
};
