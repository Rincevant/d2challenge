const Sequelize = require('sequelize');

// Connection en ligne
//module.exports = new Sequelize("postgres://postgres:rincevantdu83@switchachievements.cs8qwrpw55f2.us-east-2.rds.amazonaws.com:5432/postgres");

var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"

module.exports = new Sequelize(dbname, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

