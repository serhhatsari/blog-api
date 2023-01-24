const personModel = require("../models/personModel");
const { hashPassword, checkPassword, generateTokens } = require("../utils/index");

function register(req, res) {
    personModel.build({
        person_name: req.body.name,
        person_surname: req.body.surname,
        person_mail: req.body.mail,
        person_password: hashPassword(req.body.password),
    })
        .save()
        .then((person) => {
            console.log(person);
            return res.status(200).send({
                status: "success",
                message: "Person created",
                data: {
                    name: req.body.name,
                    surname: req.body.surname,
                    mail: req.body.mail,
                    accessToken: generateTokens(person.person_id).accessToken,
                    refreshToken: generateTokens(person.person_id).refreshToken,
                }
            });
        })
        .catch((err) => {
            return res.status(400).send({
                status: "error",
                message: err["errors"][0]["message"],
            });
        });
}

function login(req, res) {
    personModel.findOne({
        where: {
            person_mail: req.body.mail,
        },
    })
        .then((person) => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found",
                });
            }

            checkPassword(req.body.password, person.person_password);

            const tokens = generateTokens(person.person_id);

            return res.status(200).send({
                status: "success",
                message: "Person logged in",
                data: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    name: person.person_name,
                    surname: person.person_surname,
                    mail: person.person_mail,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).send({
                message: "Error while finding person",
            });
        });
}



module.exports = {
    register,
    login,
};