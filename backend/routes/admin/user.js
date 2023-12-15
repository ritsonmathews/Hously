const express = require("express");
const { isAdmin, adminById, listAccStatus } = require("../../controllers/admin");
const { requireSignIn } = require("../../controllers/auth");
const { readUser, userById, listallUsers, listAllSeekers, listAllProviders, updateUserByAdmin, listAllAdmins, providerSearch, seekerSearch } = require("../../controllers/user");
const router = express.Router();

//@desc Read User 
router.get("/admin/user/read/:userId/:adminId",requireSignIn,isAdmin, readUser);

//@desc List all users (Seekers + Providers)
router.get("/admin/listall/users/:adminId",requireSignIn,isAdmin, listallUsers);

//@desc List all available Seekers 
router.get("/admin/listall/seekers/:adminId",requireSignIn,isAdmin, listAllSeekers);

//@desc List all available Providers
router.get("/admin/listall/providers/:adminId",requireSignIn,isAdmin, listAllProviders);

//desc List all User Account Status
router.get("/admin/listall/acc-status/:adminId",requireSignIn,isAdmin, listAccStatus);

//desc Update user profile (including Changing user roles + Account statuses)
router.put("/admin/user/update/:userId/:adminId",requireSignIn,isAdmin, updateUserByAdmin);

//desc Search Providers
router.get("/admin/provider/search/:adminId", requireSignIn, isAdmin, providerSearch)

//desc Search Seeker
router.get("/admin/seeker/search/:adminId", requireSignIn, isAdmin, seekerSearch)

router.param("userId", userById);
router.param("adminId", adminById);


module.exports = router;
