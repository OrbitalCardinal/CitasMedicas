const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Area = sequelize.define(
    "area",
    {
        id_area: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha_reg: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    },
    {
        schema: "citas",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Area;