const Presentation = require("../../models/presentation");

exports.findById = (id) => Presentation.findByPk(id);