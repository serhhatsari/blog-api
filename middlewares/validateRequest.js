function validateRequest(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized");
    }
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send("Unauthorized: Invalid token");
        }
    });
}

module.exports = {
    validateRequest,
};