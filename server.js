//Reference to express, to start the server
const express = require('express');
//To route api/page calls refer to controllers
const routes = require('./controllers');
//To connect to db , refer to connection file
const sequelize = require('./config/connection');
//To get directory paths use path library
const path = require('path');
//For views and templates using express-handlebars
const exhbs = require('express-handlebars');

//Libraries to hanlde session
//Get express session library
const session = require('express-session');
//Connect to package for sequelize session store
const sequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();



//Create handlebars
const hbs = exhbs.create();

//express server
const app = express();
const PORT = process.env.PORT || 3001;

//Setup session variable, with connection to db parameters
const sess = {
    secret: process.env.SESSION_SECRET,
   cookie: {},
   resave: false,
   saveUninitialized: true,
   store: new sequelizeStore({
       db:sequelize})  
};

app.use(session(sess));

//express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Redirect calls to routes
app.use(routes);

//connect to db if that is successfull, start the server on give port
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log(`Now listening at ${PORT}`));
});

//To Do - Comment count , need adhoc query data from Post table