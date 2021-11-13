const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const CitaMedica = sequelize.define(
  "cita_medica",
  {
    id_cita: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_hora: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_doctor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_paciente: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  {
    schema: "citas",
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = CitaMedica;
