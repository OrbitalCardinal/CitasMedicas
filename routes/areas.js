const express = require("express");
const router = express.Router();

// Controllers

const areasController = require("../controllers/areas");

router.get('/areas', areasController.getAreas);
router.post("/areas", areasController.registerArea);
router.put("/areas", areasController.editArea);
router.delete("/areas", areasController.deleteArea);

module.exports = router;