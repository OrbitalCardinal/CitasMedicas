const express = require("express");
const router = express.Router();

// Controller import
const horasController = require("../controllers/horas");

router.get("/horas", horasController.getHoras);

module.exports = router;