const express=require("express");
var cors = require('cors')
var sequelize = require('./database/connexion')
const path=require("path");
const app=express();
var port = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use(cors())

// Connect to databse
sequelize.authenticate().then(() => {
    console.log('Connection established successfully!!!!');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

//Declaration des routes
var pages = require('./routes/pages')
var authRegister = require('./routes/authRegister')
var authLogin = require('./routes/authLogin')
var holygrail = require('./routes/holygrail')
var saveTemplate = require('./routes/saveTemplate')

// Static Files
app.use(express.static(__dirname + '/public'));

// Set View's
app.set('views', path.join(__dirname + "/public", 'views'));
app.set('view engine', 'ejs');

// Utilisation des routes
app.use("/", pages);
app.use("/login", authLogin);
app.use("/register", authRegister);
app.use("/holygrail", holygrail);
app.use("/saveTemplate", saveTemplate);



app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);    
});