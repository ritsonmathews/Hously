const express = require("express");
const router = express.Router();

const { createApplication, readOne, listInternshipApplications, removeApplication, updateApplication, resume, applicationById, listAllApplications, getStatusValues, updateApplicationByAdmin, listApplicationsByUser, searchApplication } = require("../../controllers/application");
const { requireSignIn } = require("../../controllers/auth");
const { internshipById } = require("../../controllers/internships");
const { userById } = require("../../controllers/user");
const { isAdmin, adminById } = require("../../controllers/admin");

//@desc apply for internship
router.post("/admin/apply/application/:internshipId/:adminId", requireSignIn, createApplication);

//@desc Read one application
router.get("/admin/read/application/:applicationId/:adminId",requireSignIn,isAdmin, readOne);

//@desc List all application
router.get("/admin/listall/application/:adminId",requireSignIn,isAdmin, listAllApplications);

//@desc List all application of one intership
router.get("/admin/listapplications/:internshipId/:adminId/",requireSignIn,isAdmin, listInternshipApplications);

//@desc List all application of one user
router.get("/admin/user/listapplications/:userId/:adminId",requireSignIn,isAdmin, listApplicationsByUser);

//@desc List application statuses to front-end
router.get("/admin/status-values/:adminId", requireSignIn,isAdmin, getStatusValues);

//@desc Update application
router.put("/admin/update/application/:applicationId/:adminId",requireSignIn,isAdmin, updateApplicationByAdmin);

//@desc Delete application
router.delete("/admin/delete/application/:applicationId/:adminId", removeApplication);

//@desc search application
router.get("/admin/search/application/:adminId", searchApplication);

//@desc Read resume
router.get("/admin/read/resume/:applicationId", resume);

router.param("applicationId", applicationById)
router.param("internshipId", internshipById)
router.param("userId", userById)
router.param("adminId", adminById)


module.exports = router;
