function validateRegister(req, res, next) {
    const { name, surname, mail, password } = req.body;
    if (!name || !surname || !mail || !password) {
        return res.status(400).json({ message: 'Name, Surname, Mail, and Password are required.' });
    }
    next();
};

module.exports = validateRegister;