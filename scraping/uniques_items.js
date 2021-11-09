const Sequelize = require('sequelize');


var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"

/*
var dbname = "d79a8drjd5q1g6"
var username = "yqvqwpuzkjkrek"
var password = "ad26e538911aff6febc1c7068c64382666c956dd7872a3a954ebb03e245899b6"
*/

db = new Sequelize(dbname, username, password, {
    //host : 'ec2-63-34-223-144.eu-west-1.compute.amazonaws.com',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    /*dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }*/
});

const Unique = db.define('unique_items', {
    kind: {
        type: Sequelize.STRING,
        allowNull: false      
    },
    part: {
        type: Sequelize.STRING,
        allowNull: false         
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false   
    },
    type : {
        type: Sequelize.STRING,
        allowNull: false   
    },
    properties: {
        type: Sequelize.TEXT,
        allowNull: false   
    },
    item: {
        type: Sequelize.STRING,
        allowNull: false   
    },    
    image: {
        type: Sequelize.STRING,
        allowNull: false       
    }
}, {
    timestamps: false
});

Unique.sync().then(res => {
})

module.exports = Unique