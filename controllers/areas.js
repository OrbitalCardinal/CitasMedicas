// Models imports

// Get areas
exports.getAreas = (req, res, next) => {
    res.status(200).json({
        message: "Hello from get areas"
    });
};

// Register area
exports.registerArea = (req, res, next) => {
    res.status(200).json({
        message: "Hello from register areas"
    });
};

// Edit area
exports.editArea = (req, res, next) => {
    res.status(200).json({
        message: "Hello from edit area"
    });
};