const express = require("express");
const router = express.Router();

const { loginOtp, verifyOtp, signout, isBlocked, adminSignout, requireSignIn } = require("../controllers/auth");
const { adminSignup, adminLogin,adminPasswordChange,adminUpdate, isAdmin, adminById } = require("../controllers/admin");
const { adminSignupValidator, adminLoginValidator, userSignupValidator, userLoginValidator } = require("../validators");

//@desc login with otp
router.post("/user/login",isBlocked,userSignupValidator, loginOtp);

//@desc Verify otp
router.post("/user/verify",userLoginValidator, verifyOtp);

//@desc Signout
router.get("/user/signout", signout);

//@desc admin signup
router.post("/admin/signup",adminSignupValidator, adminSignup);

//@desc admin Login
router.post("/admin/login",adminLoginValidator, adminLogin);

//@desc admin Signout
router.get("/admin/signout", adminSignout);

router.param("adminId", adminById);

module.exports = router;
