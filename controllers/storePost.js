/**
 * Always consider the locaiton of the file
 */
const Post = require('../database/models/Post');
const path = require('path');

module.exports = (req, res, next) => {
    const image = req.files.post_image;
    // upload the file to the post 
    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`, 
            user_id: req.session.userId
        }, (error, post) => {
            res.redirect('/');
        });
    });
}