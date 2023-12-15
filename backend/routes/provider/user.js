const express = require("express");
const router = express.Router();

const { isProvider, requireSignIn, isAuth } = require("../../controllers/auth");
const { userById, readUser } = require("../../controllers/user");

//@desc Read user Profile
router.get("/provider/user/read/:userId", requireSignIn, isAuth,isProvider, readUser);

//@desc Read user Profile
router.get("/user/read/:userId", requireSignIn, isAuth, readUser);

router.param("userId", userById);

module.exports = router;
