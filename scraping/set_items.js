const Sequelize = require('sequelize');
const db = require('./connexion')

const Set = db.define('set_items', {
    setName: {
        type: Sequelize.STRING,
        allowNull: false      
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false         
    },
    part: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    type : {
        type: Sequelize.STRING,
        allowNull: false   
    },
    kind : {
        type: Sequelize.STRING,
        allowNull: false   
    },
    item: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false   
    },    
    properties: {
        type: Sequelize.TEXT,
        allowNull: false         
    }
}, {
    timestamps: false
});

Set.sync().then(res => {
})

module.exports = Set