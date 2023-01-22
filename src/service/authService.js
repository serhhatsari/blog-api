const personModel = require("../models/person");

function register(req, res) {
    const person = buildPerson(req);
    person
        .save()
        .then((person) => {
            console.log(person);
            return res.status(200).send({
                name: req.body.name,
                surname: req.body.surname,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                error: err["errors"][0]["message"],
            });
        });
}

function buildPerson(req) {
    const person = personModel.build({
        person_name: req.body.name,
        person_surname: req.body.surname,
        person_mail: req.body.mail,
        person_password: hashPassword(req.body.password),
    });
    return person;
}

function hashPassword(password) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
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
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
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

function checkPassword(pass, person_pass) {
    const bcrypt = require('bcrypt');
    if (!bcrypt.compareSync(pass, person_pass)) {
        return res.status(401).send({
            message: "Wrong password",
        });
    }

}


function generateTokens(person_id) {
    const jwt = require('jsonwebtoken');
    const accessToken = jwt.sign({
        id: person_id,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });

    const refreshToken = jwt.sign({
        id: person_id,
    }, process.env.REFRESH_TOKEN_SECRET);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
}

module.exports = {
    register,
    login,
};