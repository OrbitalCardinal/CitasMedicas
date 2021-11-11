// Model import

// Get pacients
exports.getPacients = (req, res, next) => {
    res.status(200).json({
        message: "Hello from get pacients"
    });
};

// New pacient
exports.registerPacient = (req, res, next) => {
    res.status(200).json({
        message: "Hello from register pacient"
    });
};

// Update pacient
exports.editPacient = (req, res, next) => {
    res.status(200).json({
        message: "Hello from edit pacients"
    });  
};