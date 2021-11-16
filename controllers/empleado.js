// Model import
const Empleado = require("../models/empleado");

exports.getEmpleadoById = (req, res, next) => {
    const id_empleado = req.query.id;
    Empleado.findByPk(id_empleado).then(empleado => {
        res.status(200).json({
            message: "Empleado recuperado correctamente",
            data: empleado
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo recuperar Empleado",
            error: error
        });
    });
};