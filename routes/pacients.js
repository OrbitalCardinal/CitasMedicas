const express =  require("express");
const router = express.Router();

//  Controllers
const pacientsController = require("../controllers/pacients");

// Route methods
router.get("/pacients", pacientsController.getPacients);
router.post("/pacients", pacientsController.registerPacient);
router.put("/pacients", pacientsController.editPacient);
router.delete("/pacients",pacientsController.deletePacient);

module.exports = router;