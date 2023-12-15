const express = require("express");
const router = express.Router();
const { adminById, isAdmin } = require("../../controllers/admin");
const { requireSignIn } = require("../../controllers/auth");
const { addInternship, removeInternship, updateInternship, read, listInternships, internshipById, viewAllInternships, internshipStatusValues, updateInternshipStatus, listTrainings, viewAllTrainings, internshipTypeValues, internshipFeesTypeValues, internshipWorkTypeValues, listAllPrograms, listPrograms, programSearch, listProgramsData,listSortedProgramsData, genderValues } = require("../../controllers/internships");
const { userById } = require("../../controllers/user");
const { internshipValidator } = require("../../validators");

//@desc Post new internship
router.post("/admin/add/program/:adminId", requireSignIn, internshipValidator, addInternship);

//@desc Delete a program
router.delete("/admin/remove/program/:internshipId/:adminId", requireSignIn, removeInternship);

//@desc Update details of an program
router.put("/admin/update/program/:internshipId/:adminId", requireSignIn, updateInternship);

//@desc Read a program 
router.get("/admin/read/program/:internshipId/:adminId", requireSignIn, read);

//@desc View all Programs
router.get("/admin/list/all/programs/:adminId", requireSignIn, listPrograms)

//@desc View all posted Programs by a specific provider
router.get("/admin/list/programs/:userId/:adminId", requireSignIn, isAdmin, listAllPrograms)

//@desc View all posted internships by a specific provider
router.get("/admin/list/internships/:userId/:adminId", requireSignIn, isAdmin, listInternships)

//@desc View all posted trainings by a specific provider
router.get("/admin/list/trainings/:userId/:adminId", requireSignIn, isAdmin, listTrainings)

//@desc View all posted internships by all providers
router.get("/admin/view/internships/:adminId", requireSignIn, isAdmin, viewAllInternships);

//@desc View all posted trainings by all providers
router.get("/admin/view/trainings/:adminId", requireSignIn, isAdmin, viewAllTrainings);

//@desc Update program status
router.put("/admin/internship/status/:userId/:internshipId/:adminId", requireSignIn, isAdmin, updateInternshipStatus);

//@desc Get the status values
router.get("/admin/internship/status-values/:adminId",requireSignIn, isAdmin, internshipStatusValues);

//@desc Get Worktype values
router.get("/admin/internship/worktype-values/:adminId",requireSignIn, isAdmin, internshipWorkTypeValues);

//@desc Get gender values
router.get("/admin/internship/gender-values/:adminId",requireSignIn, genderValues);

//@desc Get fees-type values
router.get("/admin/internship/fees-type-values/:adminId",requireSignIn, isAdmin, internshipFeesTypeValues);

//@desc Search Programs
router.get("/admin/programs/search/:adminId",requireSignIn, isAdmin, programSearch);

//@desc View all Programs by a specific provider
router.get("/admin/list/data/programs/:userId/:adminId", requireSignIn, isAdmin, listProgramsData)
//@desc View all Programs (Active/Expired) by a specific provider
router.get("/admin/list/data/sorted/programs/:userId/:adminId", requireSignIn, isAdmin, listSortedProgramsData)




//@desc Middlewares
router.param("internshipId", internshipById);
router.param("adminId", adminById)
router.param("userId", userById)

module.exports = router;