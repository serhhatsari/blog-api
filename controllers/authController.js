const person_model = require("../models/person");

function register(req, res) {
    console.log(req.body);

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.body.password, salt);

    const person    = person_model.build({
        person_name: req.body.name,
        person_surname: req.body.surname,
        person_mail: req.body.mail,
        person_password: hash,
    });

    person
        .save()
        .then((person) => {
            console.log(person);
            return res.status(200).send({
                id: req.body.id,
                name: req.body.name,
                surname: req.body.surname,
                mail: req.body.mail,
                password: hash,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                message: "Error while saving person",
            });
        });
}

function login(req, res) {
    if (!req.body.mail || !req.body.password) {
        return res.status(400).send({
            message: "Mail and Password are required.",
        });
    }

    person_model.findOne({
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

            const bcrypt = require('bcrypt');
            if (!bcrypt.compareSync(req.body.password, person.person_password)) {
                return res.status(401).send({
                    message: "Wrong password",
                });
            }

            const jwt = require('jsonwebtoken');
            const accessToken = jwt.sign({
                id: person.person_id,
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });

            const refreshToken = jwt.sign({
                id: person.person_id,
            }, process.env.REFRESH_TOKEN_SECRET);

            return res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: person.person_name,
                surname: person.person_surname,

            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                message: "Error while finding person",
            });
        });
}

module.exports = {
    register,
    login,
};