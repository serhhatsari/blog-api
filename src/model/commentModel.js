const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Comment = sequelize.define(
    "comment",
    {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Content is required",
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
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Post is required",
                },
            },
            references: {
                model: "post",
                key: "post_id",
            },
        },
    },
    {
        timestamps: false,
        tableName: "comment",
    }
);

module.exports = Comment;