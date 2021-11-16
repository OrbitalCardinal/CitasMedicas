const Sequelize = require("sequelize");

// Connect to database
const password = "citas";
const db_name = "CITAS_MEDICAS";
const user = "nodeclient"
const sequelize = new Sequelize(db_name, user, password, {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
        instanceName:  "ORBITALPC",
        encrypt: true,
        trustServerCertificate: true
    },
    logging: false
});

module.exports = sequelize;