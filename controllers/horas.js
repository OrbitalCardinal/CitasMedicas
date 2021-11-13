// Model import
const Horas = require("../models/hora");

exports.getHoras = (req, res, next) => {
    Horas.findAll().then(result => {
        res.status(200).json({
            message: "Horas recuperado correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo recuperar Horas",
            error: error
        });
    });
};