const express = require("express");
const { readOne, listInternshipApplications, resume, applicationById, updateApplicationByProvider, getStatusValues } = require("../../controllers/application");
const { requireSignIn, isAuth, isProvider } = require("../../controllers/auth");
const { internshipById } = require("../../controllers/internships");
const { userById } = require("../../controllers/user");
const router = express.Router();

//@desc Read one application
router.get("/provider/read/application/:userId/:applicationId",requireSignIn,isAuth,isProvider, readOne);

//@desc List all application of one intership
router.get("/provider/listall/applications/:userId/:internshipId", requireSignIn,isAuth,isProvider, listInternshipApplications);

//@desc List application statuses to front-end
router.get("/provider/status-values/:userId", requireSignIn,isAuth,isProvider, getStatusValues);

//@desc Update application status
router.put("/provider/status/update/:userId/:applicationId", requireSignIn, updateApplicationByProvider);

//@desc Read resume
router.get("/provider/read/resume/:userId/:applicationId",resume);

router.param("applicationId", applicationById)
router.param("internshipId", internshipById)
router.param("userId", userById)


module.exports = router;
