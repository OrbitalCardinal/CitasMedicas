// Model import
const Dia = require("../models/dia");

// Get Dias
exports.getDias = (req, res, next) => {
    Dia.findAll().then(dias => {
        res.status(200).json({
            message: "Dias recuperado correctamente",
            data: dias
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo recuperar Dias",
            error: error
        });
    });
}