// Models import

const { json } = require("express");

// Get appointments
exports.getAppointments = (req, res, next) => {
    res.status(200).json({
        message: "Hello from get appointments"
    });
};

// Register appointment
exports.registerAppointment = (req, res, next) => {
    res.status(200).json({
        message: "Hello from registar appointments"
    });
};

// Edit appointment
exports.editAppointment = (req, res, next) => { 
    res.status(200).json({
        message: "Hello from edit appointment"
    });
};

// Delete appointment
exports.deleteAppointment = (req, res, next) => {
    res.status(200).json({
        message: "Hello from delete appointment"
    });
};