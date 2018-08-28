const express = require('express');
const {json} = require('body-parser');
const session = require('express-session');
require('dotenv').config();

//middlewares
const checkForSession = require('./middlewares/checkForSession');


//controllers
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');




const app = express();
app.use(json());

app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use( checkForSession );
app.use( express.static( `${__dirname}/build` ));
//swag controller
app.get('/api/swag', swag_controller.read);


//auth controller 
app.post('/api/login' , auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);


//cart controller
app.post('/api/cart', cart_controller.add );
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//search controller
app.get('/api/search', search_controller.search);




const port = process.env.SERVER_PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port: ${port}`));