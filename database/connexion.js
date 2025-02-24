const Sequelize = require('sequelize');

var dbname = "d2challenge"
var username = "postgres"
var password = "postgres"

module.exports = new Sequelize(dbname, username, password, {
    host : 'localhost',
    dialect: 'postgres',
    port: 5432,
});

