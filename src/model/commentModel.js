const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Person = require("./personModel");
const Post = require("./postModel");

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

Person.hasMany(Comment, { foreignKey: "user_id" });
Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Person, { required: true, foreignKey: "user_id" });
Comment.belongsTo(Post, { required: true, foreignKey: "post_id" });

module.exports = Comment;