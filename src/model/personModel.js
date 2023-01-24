const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Person = sequelize.define(
    "author",
    {
        person_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        person_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name is required",
                },
            },
        },
        person_surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Surname is required",
                },
            },
        },
        person_mail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Mail is required",
                },
                isEmail: {
                    msg: "Mail is not valid",
                },
                isUnique: function (value, next) {
                    Person.findOne({ where: { person_mail: value } })
                        .then((person) => {
                            if (person) {
                                return next("Mail already in use");
                            }
                            return next();
                        })
                        .catch((err) => {
                            return next(err);
                        });
                },
            },
        },
        person_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password is required",
                },
            },
        },
    },
    {
        timestamps: false,
        tableName: "person",
    }
);



module.exports = Person;