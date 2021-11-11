const express = require("express");
const router = express.Router();

// Controller
const appointmentsController = require("../controllers/appointments")


router.get("/appointments", appointmentsController.getAppointments);
router.post("/appointments", appointmentsController.registerAppointment);
router.put("/appointments", appointmentsController.editAppointment);
router.delete("/appointments", appointmentsController.deleteAppointment);

module.exports = router;