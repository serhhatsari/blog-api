const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function getUserID(req, res) {
    let token = req.headers.authorization.split(" ")[1];
    let userId;
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        userId = decoded.id;
    });
    return userId;
}


function hashPassword(password) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
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
    getUserID,
    hashPassword,
    checkPassword,
    generateTokens,
};