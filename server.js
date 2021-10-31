const express=require("express");
var sequelize = require('./database/connexion')
const path=require("path");
const app=express();


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

// Connect to databse
sequelize.authenticate().then(() => {
    console.log('Connection established successfully!!!!');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

//Declaration des routes
var pages = require('./routes/pages')
var auth = require('./routes/auth')
var holygrail = require('./routes/holygrail')

// Static Files
app.use(express.static('public'));

// Set View's
app.set('views', path.join(__dirname + "/public", 'views'));
app.set('view engine', 'ejs');

// Utilisation des routes
app.use("/", pages);
app.use("/login", auth);
app.use("/register", auth);
app.use("/holygrail", holygrail);

app.listen(8080,()=>{
    console.log(__dirname)
    console.log(`express server running on 8080`);
});