// Model import
const Hora = require("../models/hora");
const Horas = require("../models/hora");

exports.getHoras = (req, res, next) => {
    const idHora = req.query.id;
    if(idHora == undefined) {
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
    } else {
        Horas.findByPk(idHora).then((hora) => {
            res.status(200).json({
                message: "Hora recuperada correctamente",
                data: hora
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo recuperar la hora",
                error:  error
            });
        });
    }
};