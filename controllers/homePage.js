/**
 * Always consider the locaiton of the file
 */
const Post = require('../database/models/Post');


module.exports = async(req, res) => {
    // Use populate to get data from usar collection
    const posts = await Post.find({}).populate('author');
    console.log(req.session);
    console.log(posts);
    res.render('index', {
        posts
    });
}