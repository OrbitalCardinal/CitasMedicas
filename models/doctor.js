const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Doctor = sequelize.define(
    "doctor",
    {
        id_doctor: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            alowNull: false,
            primaryKey: true,
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cedula: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false
        },
        correo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha_reg: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        id_area: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        schema: "citas",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Doctor;