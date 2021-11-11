const express = require("express");

// Database

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

// Open port
app.listen(3000);