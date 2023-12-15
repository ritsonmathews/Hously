const express = require("express");
const router = express.Router();

const { isSeeker, isAuth, requireSignIn } = require("../../controllers/auth");
const { readUser, updateUser, userById, deleteUser } = require("../../controllers/user");

//@desc Read User profile
router.get("/seeker/profile/read/:userId", requireSignIn, isAuth,isSeeker, readUser);

//@desc Update User profile (Except role and Account status)
router.put("/seeker/profile/update/:userId",requireSignIn,isAuth,isSeeker, updateUser);

//@desc Delete User
router.delete("/seeker/profile/delete/:userId", requireSignIn,isAuth,isSeeker, deleteUser);

router.param("userId", userById);

module.exports = router;
