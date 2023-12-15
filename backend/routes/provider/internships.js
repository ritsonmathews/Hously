const express = require("express");
const router = express.Router();

const { requireSignIn, isProvider, isAuth } = require("../../controllers/auth");
const { addInternship, removeInternship, updateInternship, read, listInternships, internshipById, internshipStatusValues, updateInternshipStatus, listTrainings, internshipTypeValues, internshipFeesTypeValues } = require("../../controllers/internships");
const { userById } = require("../../controllers/user");
const { internshipValidator } = require("../../validators");

//@desc Post a new Internship
router.post("/provider/add/internship/:userId",requireSignIn, isAuth, isProvider, internshipValidator, addInternship);

//@desc Delete an Internship
router.delete("/provider/remove/internship/:userId/:internshipId",requireSignIn, isAuth, isProvider, removeInternship);

//@desc Update details of the internship
router.put("/provider/update/internship/:userId/:internshipId", requireSignIn, isAuth, isProvider, updateInternship);

//@desc View details of an internship
router.get("/provider/read/internship/:userId/:internshipId",requireSignIn, isAuth, isProvider, read);

//@desc View All internship posted
router.get("/provider/list/internships/:userId",requireSignIn, isAuth, isProvider, listInternships);

//@desc View All Trainings posted
router.get("/provider/list/trainings/:userId",requireSignIn, isAuth, isProvider, listTrainings);

//@desc Get the status values
router.get("/provider/internship/status-values/:userId",requireSignIn, isAuth, isProvider, internshipStatusValues);

//@desc Update internship status
router.put("/provider/internship/status/:userId/:internshipId", requireSignIn, isAuth, isProvider, updateInternshipStatus)

//@desc Get type values
router.get("/provider/internship/type-values/:userId",requireSignIn, isAuth, isProvider, internshipTypeValues);

//@desc Get fees-type values
router.get("/provider/internship/fees-type-values/:userId",requireSignIn, isAuth, isProvider, internshipFeesTypeValues);

//@desc Middlewares
router.param("internshipId", internshipById);
router.param("userId", userById)


module.exports = router;