const Sequelize = require('sequelize');
const db = require('./connexion')

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