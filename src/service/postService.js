const post_model = require("../models/post");

function getAllPosts(req, res) {

    return post_model
        .findAll({
            where: {
                user_id: req.body.user_id,
            },
        });

}

module.exports = {
    getAllPosts,
};
