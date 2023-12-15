const User = require("../models/user");
const Admin = require("../models/admin");
const _ = require("lodash");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// exports.userSearch = (req, res) => {
//   const regex = new RegExp(req.query.name, "i");
//   User.find({ name: regex }).exec((err, result) => {
//     if (err) {
//       return res.status(400).json({
//         error: "User not found",
//       });
//     }
//     res.status(200).json(result);
//   });
// };

//Admin Signup
exports.adminSignup = (req, res) => {
  console.log(req.body);
  const { password } = req.body;
  const admin = new Admin(req.body);
  admin.setPassword(password);
  admin.save((err, admin) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    admin.password=undefined
    res.status(200).json({
      message: "Signup Successful",
      admin
    });
  });
};

//Admin Login
exports.adminLogin = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  Admin.findOne({ username }, (err, admin) => {
    if (err || !admin) {
      return res.status(400).json({
        error: "Username not found",
      });
    } else if (!admin.validPassword(password, admin.salt, admin.password)) {
      return res.status(401).json({
        error: "Username and Password doesn't match",
      });
    }
    // create token
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    // create cookie
    res.cookie("t", token, { expiresIn: new Date() + 9999 });
    admin.password = undefined;
    admin.salt = undefined;
    res.status(200).json({
      message: "Login successful",
      token,
      admin: admin,
    });
  });
};

// Admin Password change
exports.adminPasswordChange = (req, res) => {
  const { username, password, newPassword } = req.body;
  console.log(req.body);
  Admin.findOne({ username }, (err, admin) => {
    if (err || !admin) {
      return res.status(401).json({
        error: "Admin not found",
      });
    } else if (!admin.validPassword(password, admin.salt, admin.password)) {
      return res.status(401).json({
        error: "Please enter your valid current password",
      });
    }

    const obj = {
      password: crypto
        .pbkdf2Sync(newPassword, admin.salt, 1000, 64, `sha512`)
        .toString(`hex`),
    };

    admin = _.extend(admin, obj);
    admin.save((err, newAdmin) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      newAdmin.password = undefined;
      newAdmin.salt = undefined;
      res.status(200).json({
        message: "Password successfully updated",
        newAdmin,
      });
    });
  });
};

// Update Admin Details
exports.adminUpdate = (req, res) => {
  Admin.findOneAndUpdate(
    { _id: req.admin._id },
    { $set: req.body },
    { new: true },
    (err, admin) => {
      if (err) {
        if (err.codeName === "DuplicateKey") {
          return res.status(400).json({
            error: "Username already exists",
          });
        } else {
          return res.status(400).json({
            error: err,
          });
        }
      }
      admin.password = undefined;
      admin.salt = undefined;
      res.json({ admin });
    }
  );
};

//List all Admins (Admin only)
exports.listAllAdmins = (req, res) => {
  Admin.find({}, { password: 0 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

// Get admin type
// Get admin type
exports.getAdminType = (req, res) => {
  try {
    const enumValues = Admin.schema.path("role").enumValues;
    res.json(enumValues);
  } catch (error) {
    console.error("Error while getting admin types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get admin status
exports.getAdminStatus = (req, res) => {
  res.json(Admin.schema.path("status").enumValues);
};

// Read admin
exports.getAdmin = (req, res) => {
  req.admin.password = undefined;
  req.admin.salt = undefined;
  return res.json(req.admin);
};

//Get Account Statuses
exports.listAccStatus = (req, res) => {
  res.json(User.schema.path("status").enumValues);
};

//Admin by id
exports.adminById = (req, res, next, id) => {
  Admin.findById(id).exec((err, admin) => {
    if (err || !admin) {
      return res.status(400).json({
        error: "Admin not found",
      });
    }
    req.admin = admin;
    next();
  });
};

//Check isAdmin
exports.isAdmin = (req, res, next) => {
  let admin = req.admin && req.auth && req.admin._id == req.auth._id;
  if (!admin) {
    return res.status(403).json({
      error: "Access Denied, Not Admin",
    });
  }
  next();
};
