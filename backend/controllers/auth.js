const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const client = require("twilio")(process.env.accountSID, process.env.authToken);

//Otp for users
let userData = null;
exports.loginOtp = (req, res) => {
  console.log(req.body);
  userData = req.body;
  const { name, role, number, channel } = req.body;
  client.verify
    .services(process.env.serviceSID)
    .verifications.create({
      to: `+${number}`,
      channel: `${channel}`,
    })
    
    .then((response) => {
      console.log(response);
      res.status(200).json({
        message: "Otp sent",
        response,
      });
    });
};

//Otp verification for users
exports.verifyOtp = (req, res) => {
  const { number, code } = req.body;
  client.verify
    .services(process.env.serviceSID)
    .verificationChecks.create({
      to: `+${number}`,
      code: `${code}`,
    })
    .then((response) => {
      if (response.status === "pending") {
        return res.status(400).json({
          error: "Invalid Otp",
          response,
        });
      } else {
        if (response.status === "approved") {
          User.findOne({ username: number }).exec((err, user) => {
            if (err) {
              res.status(400).json({
                error: "Something went wrong !!",
              });
            } else {
              if (user) {
                //create token
                const token = jwt.sign(
                  { _id: user._id },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1d",
                  }
                );
                //cookie
                res.cookie("t", token, { expire: new Date() + 9999 });
                const { _id, username } = user;
                res.status(200).json({
                  message: "Login succesfull",
                  token,
                  user: { _id, username },
                });
              } else {
                let password = "techknocks" + number + process.env.JWT_SECRET;
                let newUser = new User({
                  username: number,
                  password,
                  name: userData.name,
                  role: userData.role,
                });
                newUser.setPassword(password);
                newUser.save((err, user) => {
                  if (err) {
                    return res.status(400).json({
                      error: err,
                    });
                  }
                  //create token
                  const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "1d",
                    }
                  );
                  //cookie
                  res.cookie("t", token, { expire: new Date() + 9999 });
                  const { _id, name, username, role,status } = user;
                  res.status(200).json({
                    message: "Login succesfull",
                    token,
                    user: { _id, name, username, role,status },
                  });
                });
              }
            }
          });
        }
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: "Verification Failed",
      });
      // console.log(error);
    });
};

//User Signout
exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    message: "Signout successfull",
  });
};

//Admin signout
exports.adminSignout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    message: "Signout successfull",
  });
};


//require Sign in (Checks for authorization token)
exports.requireSignIn = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//isAuth
exports.isAuth = (req, res, next) => {
  let user = req.user && req.auth && req.user._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

//isSeeker
exports.isSeeker = (req, res, next) => {
  if (req.user.role !== 0) {
    return res.status(403).json({
      error: "Seeker Resourse!! Access Denied!!!",
    });
  }
  next();
};

//isProvider
exports.isProvider = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(403).json({
      error: "Provider Resourse!! Access Denied!!!",
    });
  }
  next();
};

// //isBlocked
// exports.isBlocked=(req,res,next)=>{
//   if(req.user.status==="Blocked"){
//     return res.status(403).json({
//       error:"Your Account has been blocked to perform this action"
//     })
//   }
//   next()
// }
//isBlocked
exports.isBlocked=(req,res,next)=>{
  const { name, role, number, channel } = req.body;
  User.findOne({username:number}).exec((err,user)=>{
    if(user){
      if(user.status==="Blocked"){
        return res.status(403).json({
          error:"Your Account has been BLOCKED to perform this action !!"
        })
      }
    }
    next()
  })
}
