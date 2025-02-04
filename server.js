const express=require("express");
var cors = require('cors')
var sequelize = require('./database/connexion')
const session = require("express-session");
const path=require("path");
const app=express();
var port = process.env.PORT || 8080;

// Configuration de la session
app.use(session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // mettre true si HTTPS
}));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Permet d’accéder à `user` dans EJS
    res.locals.message = req.session.message || null;
    next();
});

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
var authLogout = require('./routes/authLogout')
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
app.use("/logout", authLogout);
app.use("/register", authRegister);
app.use("/holygrail", holygrail);
app.use("/saveTemplate", saveTemplate);



app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);    
});