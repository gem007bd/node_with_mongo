const express = require('express');
const mongoose = require('mongoose');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

/**
 * Database Configuration 
 */
const DATABASE = 'mongodb://localhost/node-js-blog';

/**
 * Place where import all the controllers
 */
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePageController = require('./controllers/storePost');
const getsPostController = require('./controllers/getPost');
const getsUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

const app = express();

/**
 * Configure express session 
 */
app.use(expressSession({
    secret: 'secret'
}));

/**
 * connect with the DATABASE (node-js-blog)
 */
mongoose.connect(DATABASE);

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
 * Validate post middleware  
 */
const validateCreatePostMiddleware = require('./middleware/storePost');

/**
 * Use valid post middleware
 */
app.use('/posts/store',validateCreatePostMiddleware);

/**
 * Get all the post in the index page
 */
app.get('/', homePageController);

/**
 * Request for a post with id
 */
app.get('/posts/:id', getsPostController);

/**
 * Create new post page
 */
app.get('/post/create', createPostController);

/**
 * Registration page
 */
app.get('/auth/register', getsUserController);

/**
 * Post the request to the url to create Post
 */
app.post('/posts/store', storePageController);

/**
 *  Register user request 
 */
app.post('/users/register', storeUserController);

/**
 * Login page url
 */
app.get('/auth/login', loginController);

/**
 * Login post to database url
 */
app.post('/users/login', loginUserController);
/**
 * Under construction with my admin panel ):
 */
app.get('/admin', (req, res, next) => {
    res.render('admin')
});

/**
 *  Define the port number where the application is running
 */
app.listen(8001, () => {
    console.log('App is listing on port 8001');
});