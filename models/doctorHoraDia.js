const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const DoctorHoraDia = sequelize.define(
    "doctor_hora_dia",
    {
        id_doctor: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        id_dia: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        id_hora: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        schema: "citas",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
)

module.exports = DoctorHoraDia;