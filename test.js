const mongoose = require('mongoose');

const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/node-js-blog');

Post.create({
    title: 'My second blog post',
    username: 'test',
    description: 'second Blog post description',
    content: 'second lorem ipsom for the blog'
}, (error, post) => {
    console.log(error, post)
})

// Post.find({
//     title: 'My second blog post'
// }, (error, post) => {
//     console.log(error, post);
// })

// Post.findById('5cd0431a72ed7735c88b91c8', (error, post) => {
//     console.log(error, post);
// })

// Post.findByIdAndUpdate('5cd0431a72ed7735c88b91c8', {
//     title: 'My updated blog post title'
// }, (error, post) => {
//     console.log(error, post);
// });