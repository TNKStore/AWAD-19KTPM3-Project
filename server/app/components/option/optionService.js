const Option = require("../../models/option");
const User = require("../../models/user");

exports.findById = (id) => Option.findByPk(id);

exports.create = (position) => Option.create({
    content: "",
    isCorrect: false,
    position: position
});

exports.update =  (optionId, content, isCorrect, position) => Option.update({
    content: content,
    isCorrect: isCorrect,
    position: position
    },
    {
        where: {
            id: optionId,
        }
});

exports.delete =  (optionId) => Option.destroy({
    where: {
        id: optionId
    }
});