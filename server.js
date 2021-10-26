const express=require("express");
const path=require("path");
const app=express();

//Declaration des routes
var pages = require('./routes/pages')
var auth = require('./routes/auth')

// Static Files
app.use(express.static('public'));

// Set View's
app.set('views', path.join(__dirname + "/public", 'views'));
app.set('view engine', 'ejs');

// Utilisation des routes
app.use("/", pages);

app.listen(8080,()=>{
    console.log(__dirname)
    console.log(`express server running on 8080`);
});