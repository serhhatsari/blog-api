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


module.exports = {
    getUserID,
};