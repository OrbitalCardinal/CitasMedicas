const express = require("express");
const router = express.Router();

// Controller
const diasController = require("../controllers/dias");

router.get("/dias", diasController.getDias);


module.exports = router;