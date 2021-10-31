const Sequelize = require('sequelize');
var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"

db = new Sequelize(dbname, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

const Unique = db.define('unique_items', {
    kind: {
        type: Sequelize.STRING   
    },
    part: {
        type: Sequelize.STRING      
    },
    value: {
        type: Sequelize.STRING
    },
    name : {
        type: Sequelize.STRING
    },
    type : {
        type: Sequelize.STRING
    },
    properties: {
        type: Sequelize.TEXT
    },
    item: {
        type: Sequelize.STRING
    },    
    image: {
        type: Sequelize.STRING      
    }
}, {
    timestamps: false
});

Unique.sync().then(res => {
})

module.exports = Unique