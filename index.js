const express = require('express');
const exphbs = require('express-handlebars'); // updated to 6.0.X
const bodyParser = require('body-parser');  // Remove
const mysql = require('mysql'); // Remove

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating engine
// app.engine('hbs', exphbs({ extname: '.hbs' })); // v5.3.4
// app.set('view engine', 'hbs'); // v5.3.4

// Update to 6.0.X
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

//Connection Pool
//You don't need the connection here as we have it in userController

let connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const studentroutes = require('./routes/student-routes');
const programroutes = require('./routes/program-routes');
app.use('/', studentroutes);
app.use('/', programroutes);


app.listen(port, () => console.log(`Listening on port ${port}`));               