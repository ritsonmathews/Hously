const express = require("express");
const router = express.Router();

const { createApplication, readOne, removeApplication, updateApplication, resume, applicationById, listUserApplications } = require("../../controllers/application");
const { requireSignIn, isAuth, isSeeker } = require("../../controllers/auth");
const { internshipById } = require("../../controllers/internships");
const { userById } = require("../../controllers/user");

//@desc apply for internship
router.post("/seeker/apply/application/:userId/:internshipId", requireSignIn,isAuth,isSeeker,createApplication);

//@desc Read one application
router.get("/seeker/read/application/:userId/:applicationId", requireSignIn,isAuth,isSeeker, readOne);

//@desc List all application of a user
router.get("/seeker/listall/application/:userId", requireSignIn,isAuth,isSeeker, listUserApplications);

//@desc Delete application
router.delete("/seeker/delete/application/:userId/:applicationId", requireSignIn,isAuth,isSeeker, removeApplication);

//@desc Update application (Update function if model is changed)
router.put("/seeker/update/application/:userId/:applicationId", requireSignIn,isAuth,isSeeker, updateApplication);

//@desc Read resume
router.get("/seeker/read/resume/:applicationId", resume);


router.param("applicationId", applicationById)
router.param("internshipId", internshipById)
router.param("userId", userById)


module.exports = router;
