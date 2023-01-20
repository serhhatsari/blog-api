const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define(
    "post",

    {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Title is required",
                },
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Surname is required",
                },
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "User is required",
                },
            },
            references: {
                model: "person",
                key: "person_id",
            },
        }
    },
    {
        timestamps: false,
        tableName: "post",
    }
);

module.exports = Post;