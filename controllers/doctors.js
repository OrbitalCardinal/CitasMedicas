// Model import
const Doctor = require("../models/doctor");
const DoctorHoraDia = require("../models/doctorHoraDia");
const db = require("../utils/db");

// Get doctors
exports.getDoctors = (req, res, next) => {
    const horarioParam = req.query.horario;
    const idDoctor = req.query.idDoctor;
    if(horarioParam == undefined && idDoctor == undefined) {
        Doctor.findAll().then(doctores => {
            res.status(200).json({
                message: "Doctores recuperado correctamente",
                data: doctores
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo recuperar Doctores",
                error: error
            });
        })
    } else if(horarioParam == undefined && idDoctor != undefined) {
        Doctor.findByPk(idDoctor).then((doctor) => {
            res.status(200).json({
                message: "Doctor recuperado correctamente",
                data: doctor
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo recuperar el Doctor",
                error: error
            });
        });
    } else  {
        db.query("SELECT * FROM citas.doctor_hora_dia WHERE id_doctor=" + idDoctor).then((response) => {
            res.status(200).json({
                message: "El horario se recuperó correctamente",
                data: response
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo recuperar el horario",
                error: error
            });
        });
    }

};

// Register doctor
exports.registerDoctor = (req, res, next) => {
    const nombre = req.body.nombre;
    const cedula = req.body.cedula;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const fecha_reg = req.body.fecha_reg;
    const id_area = req.body.id_area;

    // Horario
    const horario = req.body.horario;

    Doctor.create({
        nombre: nombre,
        cedula: cedula,
        telefono: telefono,
        correo: correo,
        fecha_reg: fecha_reg,
        id_area: id_area
    }).then(result => {
        // Horario
        for(let dia in horario) {
            for(let hora of horario[dia]) {
                DoctorHoraDia.create({
                    id_doctor: result["id_doctor"],
                    id_dia: dia,
                    id_hora: hora
                });
            }
        }
        res.status(200).json({
            message: "Doctor registrado correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo registrar Doctor",
            error: error
        });
    });
};

// Edit doctor
exports.editDoctor = (req, res, next) => {
    const id_doctor = req.body.id_doctor;
    const nombre = req.body.nombre;
    const cedula = req.body.cedula;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const fecha_reg = req.body.fecha_reg;
    const id_area = req.body.id_area;

    Doctor.findByPk(id_doctor).then(doctor => {
        doctor.id_doctor = id_doctor;
        doctor.nombre = nombre;
        doctor.cedula = cedula;
        doctor.telefono = telefono;
        doctor.correo = correo;
        doctor.fecha_reg = fecha_reg;
        doctor.id_area = id_area;

        // Save
        doctor.save().then(result => {
            res.status(200).json({
                message: "Doctor editado correctamente",
                data: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo editar Doctor",
                error: error
            });
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo editar Doctor",
            error: error
        });
    });
};

// Delete doctor
exports.deleteDoctor = (req, res, next) => {
    const id_doctor = req.body.id_doctor;

    Doctor.destroy({
        where: {
           id_doctor: id_doctor 
        }
    }).then(result => {
        res.status(200).json({
            message: "Doctor eliminado correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo eliminar Doctor",
            error: error
        });
    })
};