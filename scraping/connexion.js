const Sequelize = require('sequelize');

// Connection en ligne
//module.exports = new Sequelize("postgres://postgres:rincevantdu83@switchachievements.cs8qwrpw55f2.us-east-2.rds.amazonaws.com:5432/postgres");

var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"
/*
var dbname = "d4n6rkgle70r4p"
var username = "huuchfqlyxiutq"
var password = "7987216a94e5146f32ad45263ad0c85325c446d7ce7ab222ebfbea738c09e918"
*/
module.exports = new Sequelize(dbname, username, password, {
    //host : 'ec2-54-216-90-155.eu-west-1.compute.amazonaws.com',
    host : 'localhost',
    dialect: 'postgres',
    port: 5432,
    /*dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }*/
});

