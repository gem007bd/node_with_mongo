/**
 * Always consider the locaiton of the file
 */
const Post = require('../database/models/Post');
const path = require('path');
const cloudinary = require('cloudinary'); // store file on cloud

module.exports = (req, res, next) => {
    const image = req.files.post_image;
    
    const uploadPath = path.resolve(__dirname, '..', 'public/posts', image.name);
// upload the file to the post 
    image.mv(uploadPath, (error) => {
        cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
            Post.create({
                ...req.body,
                image: result.secure_url,
                author: req.session.userId
            }, (error, post) => {
                console.log(post);
                res.redirect('/');
            });
        });
    });
}