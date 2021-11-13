const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Hora = sequelize.define(
    "hora",
    {
        id_hora: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        hora_inicial: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hora_final: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        schema: "citas",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
)

module.exports = Hora;