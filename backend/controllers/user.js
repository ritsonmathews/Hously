const User = require("../models/user");
const Admin = require("../models/admin");
const formidable = require("formidable");

//User by id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  });
};

//Read a user
exports.readUser = (req, res) => {
  req.user.password = undefined;
  req.user.salt = undefined;
  return res.json(req.user);
};

// Update User Details
exports.updateUser = (req, res) => {
  const { name, username } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name, username } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.password = undefined;
      res.json({ user });
    }
  );
};

//remove User
exports.deleteUser = (req, res) => {
  let user = req.user;
  user.remove((err, deletedData) => {
    if (err) {
      return res.status(400).json({
        error: "Error while deleting User",
      });
    }
    res.json({
      message: "User deleted succesfully",
    });
  });
};

//-----------------Admin Only------------------------

//List all users (job seekers+job providers) (Admin only)
exports.listallUsers = (req, res) => {
  Admin.find({}, { password: 0 }).exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(users);
  });
};

//List all Job Seekers (Admin only)
exports.listAllSeekers = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  let Status = req.query.Status ? req.query.Status : null;
  User.find({ role: 0, status: Status }, { password: 0 })
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

//List all Job Providers (Admin only)
exports.listAllProviders = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortby ? req.query.sortby : "_id";
  let Status = req.query.Status ? req.query.Status : null;
  User.find({ role: 1, status: Status }, { password: 0 })
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

//Update user (Admin only)
exports.updateUserByAdmin = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (user.status === "Blocked") {
        res.clearCookie("t");
        return res.json({
          message: "Your Account has been Blocked !!",
        });
      }
      user.password = undefined;
      res.json({ user });
    }
  );
};

// Search providers (Admin only)
exports.providerSearch = (req, res) => {
  const regex = new RegExp(req.query.name, "i");
  User.find({ name: regex, role: 1 }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Provider not found",
      });
    }
    res.status(200).json(result);
  });
};

// Search seekers (Admin only)
exports.seekerSearch = (req, res) => {
  const regex = new RegExp(req.query.name, "i");
  User.find({ name: regex, role: 0 }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Seeker not found",
      });
    }
    res.status(200).json(result);
  });
};

// exports.addApplicationToUserHistory = (req, res, next) => {
//   let history = [];
//   let form = new formidable.IncomingForm();
//   form.keepExtensioms = true;
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "File cannot be apploaded",
//       });
//     }
//     history.push({
//       name: fields.name,
//       domain: fields.domain,
//       email: fields.email,
//       mobile: fields.mobile,
//     });
//     console.log("1");
//   });
//   User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $push: { history: history } },
//     { new: true },
//     (err, data) => {
//       console.log("2");
//       if (err) {
//         return res.status(400).json({
//           error: "Application history could not be updated",
//         });
//       }
//       console.log("3");
//     }
//     );
//     next();
// };
