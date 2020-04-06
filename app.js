const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const path = require('path');

const {getHomePage} = require('./routes/index');
const {addCoursPage, addCours, deleteCours, editCours, editCoursPage} = require('./routes/cours');

// create connection to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manage'
});
// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});

global.db = db;

const app = express();

// configure middleware
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(__dirname, '/public')); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.get('/', getHomePage);
app.get('/add', addCoursPage);
app.get('/edit/:id', editCoursPage);
app.get('/delete/:id', deleteCours);

app.post('/add', addCours);
app.post('/edit/:id', editCours);

let port = 1234;

app.listen(port, () => console.log('Server is listening to: ' + port + ' port'));

