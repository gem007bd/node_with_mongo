require('dotenv').config();
console.log(process.env);
const express = require('express');
const mongoose = require('mongoose');
const expressEdge = require('express-edge'); // Template engine user here
const edge = require('edge.js');
const bodyParser = require('body-parser'); // to get the from data, by body
const fileUpload = require('express-fileupload'); // file upload 
const expressSession = require('express-session');  // manage session
const connectMongo = require('connect-mongo'); // store session value in database
const connectFlash = require('connect-flash'); // flash error message from session 
const cloudinary = require('cloudinary'); // store file on cloud

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
const logoutController = require('./controllers/logout');

/**
 * Create Express application 
 */
const app = express();

/**
 * Regster connect flash midddleware
 */
app.use(connectFlash());

/**
 *  Cloudinary configuration
 */
cloudinary.config({
    api_key: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_API_KEY
});


/**
 * connect with the DATABASE (node-js-blog)
 */
mongoose.connect(process.env.DB_URI);

/**
 *  Create mongo store
 *  To store session value?!!
 */
const mongoStore = connectMongo(expressSession);

/**
 * Configure express session 
 */
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));


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
 * global auth middleware
 */
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId),
    next()
})
/**
 * Middlewares
 */
const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

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
 * to check the login validity
 */
app.get('/post/create',  createPostController);

/**
 * Registration page
 */
app.get('/auth/register', redirectIfAuthenticated, getsUserController);

/**
 * Post the request to the url to create Post
 * the middleware which validate post
 */
app.post('/posts/store',  storePost, storePageController);

/**
 *  Register user request 
 */
app.post('/users/register', redirectIfAuthenticated, storeUserController);

/**
 * Login page url
 */
app.get('/auth/login', redirectIfAuthenticated, loginController);


app.get('/auth/logout', logoutController);


/**
 * Login post to database url
 */
app.post('/users/login', redirectIfAuthenticated, loginUserController);

/**
 *  Not found page
 */
app.use((req, res) => res.render('not-found'));

/**
 * Under construction with my admin panel ):
 */
app.get('/admin', (req, res, next) => {
    res.render('admin')
});

/**
 *  Define the port number where the application is running
 */
app.listen(process.env.PORT, () => {
    console.log('App is listing on port 8001');
});