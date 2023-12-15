const express = require("express");
const { addDomain, deleteDomain, domainById, listDomain } = require("../../controllers/domain");
const router = express.Router();
const { requireSignIn } = require("../../controllers/auth");
const { isAdmin, adminById } = require("../../controllers/admin");
const { domainValidator } = require("../../validators");

//@desc Add new Domain
router.post("/admin/add/domain/:adminId",requireSignIn, domainValidator, addDomain);

//@desc List all Domain
router.get("/admin/list/domain/:adminId",requireSignIn, isAdmin, listDomain);

//@desc Delete a Domain
router.delete("/admin/delete/domain/:adminId/:domainId",requireSignIn, isAdmin, deleteDomain);

//@desc Middlewares
router.param("adminId", adminById)
router.param("domainId", domainById)


module.exports = router;
