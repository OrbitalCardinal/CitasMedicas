// Models import
const CitaMedica = require("../models/citaMedica");

// Get appointments
exports.getCitas = (req, res, next) => {
    CitaMedica.findAll().then(result => {
        res.status(200).json({
            message: "Citas recuperadas correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo recuperar Citas",
            error: error,
        });
    });
};

// Register appointment
exports.registerCita = (req, res, next) => {
    const id_hora = req.body.id_hora;
    const id_doctor = req.body.id_doctor;
    const id_paciente = req.body.id_paciente;
    const fecha = req.body.fecha;

    CitaMedica.create({
        id_hora: id_hora,
        id_doctor:id_doctor,
        id_paciente: id_paciente,
        fecha:fecha
    }).then(result => {
        res.status(200).json({
            message: "Cita registrada correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo registrar la Cita",
            error: error
        });
    })
};

// Edit appointment
exports.editCita = (req, res, next) => { 
    const id_cita = req.body.id_cita;
    const id_hora = req.body.id_hora;
    const id_doctor = req.body.id_doctor;
    const id_paciente = req.body.id_paciente;
    const fecha = req.body.fecha;

    CitaMedica.findByPk(id_cita).then(cita => {
        cita.id_cita = id_cita;
        cita.id_hora = id_hora;
        cita.id_doctor = id_doctor;
        cita.id_paciente = id_paciente;
        cita.fecha = fecha;

        cita.save().then(result => {
            res.status(200).json({
                message: "Cita editada correctamente",
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo editar Cita",
                error: error
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo editar Cita",
                error: error
            });
        })
    })
};

// Delete appointment
exports.deleteCita = (req, res, next) => {
    const id_cita = req.body.id_cita;

    CitaMedica.destroy({
        where: {
            id_cita: id_cita
        }
    }).then(result => { 
        res.status(200).json({
            message: "Cita eliminada correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo eliminar Cita",
            error: error
        });
    })
};