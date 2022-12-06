const Option = require("../../models/option");
const User = require("../../models/user");

exports.findById = (id) => Option.findByPk(id);

exports.create = () => Option.create({
    content: "",
    isCorrect: false
});

exports.update =  (optionId, content, isCorrect) => Option.update({
    content: content,
    isCorrect: isCorrect,
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