const express = require("express");

// Database
const sequelize = require("./utils/db");

// Routes imports
const pacientsRoute = require("./routes/pacients");
const doctorsRoute = require("./routes/doctors");
const appointmentsRoute = require("./routes/appointments");
const areasRoute = require("./routes/areas");

// Init app
const app = express();

// Decode json
app.use(express.json());

// Sequelize models
const Paciente = require("./models/paciente");
const Doctor = require("./models/doctor");
const Area = require("./models/area");
const Dia = require("./models/dia");
const Hora =  require("./models/hora");
const Empleado = require("./models/empleado");
const DoctorHoraDia = require("./models/doctorHoraDia");
const CitaMedica = require("./models/citaMedica");

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routes declaration
app.use(pacientsRoute);
app.use(doctorsRoute);
app.use(appointmentsRoute);
app.use(areasRoute);


// Database relationships

// One to many doctor_hora_dia
Doctor.hasMany(DoctorHoraDia, { foreignKey: "id_doctor"});
Dia.hasMany(DoctorHoraDia, { foreignKey: "id_dia"});
Hora.hasMany(DoctorHoraDia, {foreignKey: "id_hora"});

// One to many area con doctor
Area.hasMany(Doctor, {foreignKey: "id_area"});

// One to many cita_medica
Doctor.hasMany(CitaMedica, {foreignKey: "id_doctor"});
Hora.hasMany(CitaMedica, {foreignKey: "id_hora"});
Paciente.hasMany(CitaMedica, {foreignKey: "id_paciente"});

// Test connection
// sequelize.authenticate().then(() => console.log('Connection has been established successfully.')).catch(error => console.error('Unable to connect to the database:', error));

// Create database schema
sequelize.createSchema('citas').then(() => {
    sequelize.sync().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
}).catch(err => console.log(err));

// Open port
app.listen(3000);