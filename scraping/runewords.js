const Sequelize = require('sequelize');
const db = require('./connexion')

const Runewords = db.define('runewords', {
    item: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    originalRuneWords: {
        type: Sequelize.STRING,
        allowNull: false         
    },
    allowedItems: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    runeOrder : {
        type: Sequelize.STRING,
        allowNull: false   
    },
    completedStats : {
        type: Sequelize.TEXT,
        allowNull: false   
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false   
    }
}, {
    timestamps: false
});

Runewords.sync().then(res => {
})

module.exports = Runewords