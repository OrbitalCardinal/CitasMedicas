const express = require("express");
const router = express.Router();

// Controller
const doctorsController = require("../controllers/doctors");

router.get("/doctors", doctorsController.getDoctors);
router.post("/doctors", doctorsController.registerDoctor);
router.put("/doctors", doctorsController.editDoctor);
router.delete("/doctors", doctorsController.deleteDoctor);

module.exports = router;