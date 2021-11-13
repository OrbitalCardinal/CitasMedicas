const express = require("express");
const router = express.Router();

// Controller
const appointmentsController = require("../controllers/citas")


router.get("/citas", appointmentsController.getCitas);
router.post("/citas", appointmentsController.registerCita);
router.put("/citas", appointmentsController.editCita);
router.delete("/citas", appointmentsController.deleteCita);

module.exports = router;