// Models imports
const Area = require("../models/area");

// Get areas
exports.getAreas = (req, res, next) => {
  const idParam = req.query.id;
  if(idParam == undefined) {
    Area.findAll()
    .then((areas) => {
      res.status(200).json({
        message: "Areas recuperadas correctamente",
        data: areas,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "No se pudo recuperar Areas",
        error: error,
      });
    });
  } else {
    Area.findByPk(idParam).then((area) => {
      res.status(200).json({
        message: "Area recuperada correctamente",
        data: area
      });
    }).catch(error => {
      res.status(500).json({
        message: "No se pudo recuperar paciente",
        error: error
      });
    });;
  }

};

// Register area
exports.registerArea = (req, res, next) => {
  const nombre = req.body.nombre;
  const fecha_reg = req.body.fecha_reg;
  Area.create({
    nombre: nombre,
    fecha_reg: fecha_reg,
  })
    .then((result) => {
      res.status(200).json({
        message: "Area registrada correctamente",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "No se pudo registrar Areas",
        error: error,
      });
    });
};

// Edit area
exports.editArea = (req, res, next) => {
  const id_area = req.body.id_area;
  const nombre = req.body.nombre;
  const fecha_reg = req.body.fecha_reg;

  Area.findByPk(id_area)
    .then((area) => {
      area.id_area = id_area;
      area.nombre = nombre;
      area.fecha_reg = fecha_reg;

      area
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Area editada correctamente",
            data: result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "No se pudo editar Area",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "No se pudo editar Area",
        error: error,
      });
    });
};

// Delete area
exports.deleteArea = (req, res, next) => {
    const id_area = req.body.id_area;

    Area.destroy({
        where: {
            id_area: id_area
        }
    }).then(result => {
        res.status(200).json({
            message: "Area eliminado correctamente",
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "No se pudo eliminar Area",
            error: error
        });
    });
}
