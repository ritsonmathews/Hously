const express = require("express");
const { adminPasswordChange, adminUpdate, adminById, getAdminType,getAdmin, listAllAdmins,getAdminStatus } = require("../../controllers/admin");
const router = express.Router();


//@desc admin get profile
router.get("/admin/profile/:adminId", getAdmin);

//@desc admin change password
router.put("/admin/change/password", adminPasswordChange);

//@desc admin edit profile
router.put("/admin/edit/:adminId", adminUpdate);

//@desc get admin type
router.get("/admin/admin-types", getAdminType);

//@desc get admin status
router.get("/admin/status/:adminId", getAdminStatus);

//@desc List all available Admins
router.get("/admin/listall/admins/:adminId", listAllAdmins);


router.param("adminId", adminById);

module.exports = router;
