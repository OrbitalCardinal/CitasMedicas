const express = require("express");
const router = express.Router();

// Controller import
const empleadoController = require("../controllers/empleado");

router.get("/empleados", empleadoController.getEmpleadoById);

module.exports = router;