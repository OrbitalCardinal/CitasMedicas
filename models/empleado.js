const Sequelize =  require("sequelize");
const sequelize = require("../utils/db");

const Empleado = sequelize.define(
    "empleado",
    {
        id_empleado: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false, 
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contraseña: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        schema: "citas",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Empleado;