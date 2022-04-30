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

//Create handlebars
const hbs = exhbs.create();
//express server
const app = express();
const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Redirect calls to routes
app.use(routes);

//connect to db if that is successfull, start the server on give port
sequelize.sync({force: true}).then(()=>{
    app.listen(PORT, () => console.log(`Now listening at ${PORT}`));
});