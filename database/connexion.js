const Sequelize = require('sequelize');

// Connection en ligne
//module.exports = new Sequelize("postgres://postgres:rincevantdu83@switchachievements.cs8qwrpw55f2.us-east-2.rds.amazonaws.com:5432/postgres");
/*
var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"
*/
var dbname = "d768vnt54nig6m"
var username = "wybwxpqnembvdd"
var password = "2ea95e4213fc19a9cd18ad97ae7be6f1f15435fcefb0c734e806fc3c687642a3"

module.exports = new Sequelize(dbname, username, password, {
    host : 'ec2-18-202-1-222.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

