const Sequelize = require('sequelize');
const db = require('../connexion')

const Runewords = db.define('runewords', {
    item: {
        type: Sequelize.STRING   
    },
    originalRuneWords: {
        type: Sequelize.STRING      
    },
    allowedItems: {
        type: Sequelize.STRING
    },
    runeOrder : {
        type: Sequelize.STRING
    },
    completedStats : {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

Runewords.sync().then(res => {
})

module.exports = Runewords