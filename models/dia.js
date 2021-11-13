const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Dia = sequelize.define(
    "dia",
    {
        id_dia: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nomnbre: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        schema: "citas",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = Dia;