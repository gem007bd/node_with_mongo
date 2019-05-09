const express = require('express');
const mongoose = require('mongoose');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');


/**
 *  Call the Post Model
 */
const Post = require('./database/models/Post');

const app = express();

/**
 * connect with the database (node-js-blog)
 */
mongoose.connect('mongodb://localhost/node-js-blog');

/**
 * Use fileupload for uploading file
 */
app.use(fileUpload());

/**
 * body parser to parse the request
 * parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


/**
 *  Use the template engine 
 */
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views/layouts`);

/**
 * get all the post in the index page
 */
app.get('/', async(req, res) => {

    const posts = await Post.find({});
    console.log(posts);
    res.render('index', {
        posts
    });
});

/**
 * Get data from about page
 */
app.get('/about', (req, res, next) => {
    res.render('about');
});

// app.get('/post', (req, res, next) => {
//     res.render('post');
// });

/**
 * request for a post with id
 */
app.get('/posts/:id', async(req, res, next) => {
    const singlePost = await Post.findById(req.params.id);
    res.render('post', {
        singlePost
    });
});

app.get('/contact', (req, res, next) => {
    res.render('contact')
});

/**
 * Create new post page
 */
app.get('/post/create', (req, res, next) => {
    res.render('create')
});

/**
 * Post the request to the url to create Post
 */
app.post('/posts/store', (req, res, next) => {
    const image = req.files.post_image;
    // upload the file to the post 
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        });
    });
})

// admin login panel
app.get('/admin', (req, res, next) => {
    res.render('admin')
});

app.listen(8001, () => {
    console.log('App is listing on port 8001');
});