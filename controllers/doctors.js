// Model import

// Get doctors
exports.getDoctors = (req, res, next) => {
    res.status(200).json({
        message: "Hello from get doctors"
    });
};

// Register doctor
exports.registerDoctor = (req, res, next) => {
    res.status(200).json({
        message: "Hello from register doctor"
    });
};

// Edit doctor
exports.editDoctor = (req, res, next) => {
    res.status(200).json({
        message: "Hello from edit doctor"
    });
};

// Delete doctor
exports.deleteDoctor = (req, res, next) => {
    res.status(200).json({
        message: "Hello from delete doctor"
    });
};