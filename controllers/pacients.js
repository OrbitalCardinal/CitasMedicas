// Model import
const Paciente = require("../models/paciente");

// Get pacients
exports.getPacients = (req, res, next) => {
    const idPaciente = req.query.id;
    if(idPaciente == undefined) {
        Paciente.findAll().then(pacientes => {
            res.status(200).json({
                message: "Pacientes recuperados correctamente",
                data: pacientes
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo recuperar pacientes",
                error: error
            });
        })
    } else {
        Paciente.findByPk(idPaciente).then((paciente) => {
            res.status(200).json({
                message: "Paciente recuperado correctamente",
                data: paciente
            });
        }).catch(error => {
            res.status(500).json({
                message: "No se pudo recuperar paciente",
                error: error
            });
        });
    }
};

// New pacient
exports.registerPacient = (req, res, next) => {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const fecha_nac = req.body.fecha_nac;
    const sexo = req.body.sexo;
    const domicilio = req.body.domicilio;
    const tel_principal = req.body.tel_principal;
    const tel_secundario = req.body.tel_secundario;
    const correo = req.body.correo;
    const fecha_reg = req.body.fecha_reg;

    Paciente.create({
        nombres: nombres, 
        apellidos: apellidos,
        fecha_nac: fecha_nac,
        sexo: sexo,
        domicilio: domicilio,
        tel_principal: tel_principal,
        tel_secundario: tel_secundario,
        correo: correo,
        fecha_reg: fecha_reg
    }).then(result => {
        res.status(200).json({
            message: "Paciente registrado correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo registrar Paciente",
            error: error
        });
    })
};

// Update pacient
exports.editPacient = (req, res, next) => {
    const id_paciente = req.body.id_paciente;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const fecha_nac = req.body.fecha_nac;
    const sexo = req.body.sexo;
    const domicilio = req.body.domicilio;
    const tel_principal = req.body.tel_principal;
    const tel_secundario = req.body.tel_secundario;
    const correo = req.body.correo;
    const fecha_reg = req.body.fecha_reg;

    Paciente.findByPk(id_paciente).then(paciente => {
        paciente.nombres = nombres;
        paciente.apellidos = apellidos;
        paciente.fecha_nac = fecha_nac;
        paciente.sexo = sexo;
        paciente.domicilio = domicilio;
        paciente.tel_principal = tel_principal;
        paciente.tel_secundario = tel_secundario;
        paciente.correo = correo;
        paciente.fecha_reg = fecha_reg;

        // Save
        paciente.save().then(result => {
            res.status(200).json({
                message: "Paciente editado correctamente",
                data: result
            });
        }).catch(error => {
            res.status(500).json(({
                message: "No se pudo editar Paciente",
                error: error
            }));
        })
    })
};

// Delete pacient
exports.deletePacient = (req, res, next) => {
    const id_paciente = req.body.id_paciente;

    Paciente.destroy({
        where: {
            id_paciente: id_paciente
        }
    }).then(result => {
        res.status(200).json({
            message: "Paciente eliminado correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo eliminar Paciente",
            error: error
        });
    });
}