const Sequelize = require('sequelize');
const db = require('../connexion')

const Set = db.define('set_items', {
    setName: {
        type: Sequelize.STRING   
    },
    name: {
        type: Sequelize.STRING      
    },
    part: {
        type: Sequelize.STRING
    },
    type : {
        type: Sequelize.STRING
    },
    kind : {
        type: Sequelize.STRING
    },
    item: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },    
    properties: {
        type: Sequelize.TEXT      
    }
}, {
    timestamps: false
});

Set.sync().then(res => {
})

module.exports = Set