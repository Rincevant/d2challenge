const Sequelize = require('sequelize');

// Connection en ligne
//module.exports = new Sequelize("postgres://postgres:rincevantdu83@switchachievements.cs8qwrpw55f2.us-east-2.rds.amazonaws.com:5432/postgres");
/*
var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"
*/
var dbname = "d79a8drjd5q1g6"
var username = "yqvqwpuzkjkrek"
var password = "ad26e538911aff6febc1c7068c64382666c956dd7872a3a954ebb03e245899b6"

module.exports = new Sequelize(dbname, username, password, {
    host : 'ec2-63-34-223-144.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

