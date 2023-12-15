const express = require("express");
const router = express.Router();

const { requireSignIn, isAuth, isSeeker } = require("../../controllers/auth");
const { listAllInternships , internshipById, read, listAllTrainings, listAllFreeInternships, listAllFreeTrainings, listAllPaidInternships, listAllPaidTrainings } = require("../../controllers/internships");
const { userById } = require("../../controllers/user");

//@desc View All internships posted by the provider
router.get("/seeker/list/internships/:userId", requireSignIn, isAuth, isSeeker, listAllInternships);

//@desc View All free internships posted by the provider
router.get("/seeker/list/free-internships/:userId", requireSignIn, isAuth, isSeeker, listAllFreeInternships);

//@desc View All paid internships posted by the provider
router.get("/seeker/list/paid-internships/:userId", requireSignIn, isAuth, isSeeker, listAllPaidInternships);

//@desc View All trainings posted by the provider
router.get("/seeker/list/trainings/:userId", requireSignIn, isAuth, isSeeker, listAllTrainings);

//@desc View All free trainings posted by the provider
router.get("/seeker/list/free-trainings/:userId", requireSignIn, isAuth, isSeeker, listAllFreeTrainings);

//@desc View All paid trainings posted by the provider
router.get("/seeker/list/paid-trainings/:userId", requireSignIn, isAuth, isSeeker, listAllPaidTrainings);

//@desc Read an internship posted by the provider
router.get("/seeker/read/internship/:userId/:internshipId",requireSignIn, isAuth, isSeeker, read);


//@desc Middlewares
router.param("userId", userById);
router.param("internshipId", internshipById)

module.exports = router;
