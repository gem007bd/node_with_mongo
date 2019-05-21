/**
 * Always consider the locaiton of the file
 */
const Post = require('../database/models/Post');
module.exports = async(req, res, next) => {
    const singlePost = await Post.findById(req.params.id).populate('author');
    res.render('post', {
        singlePost
    });
}