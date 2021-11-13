const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Paciente = sequelize.define(
    "paciente",
    {
        id_paciente: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellidos: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fecha_nac: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        sexo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        domicilio: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tel_principal: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tel_secundario: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        correo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha_reg: {
            type: Sequelize.DATEONLY,
            allowNull:  false,
        }
    },
    {
        schema: "citas",
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    }
);

module.exports = Paciente;