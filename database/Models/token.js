const Sequelize = require('sequelize');
const db = require('../connexion')

const Token = db.define('token', {
    id_user: {
        type: Sequelize.INTEGER      
    },
    token: {
        type: Sequelize.TEXT      
    }
});

Token.sync().then(res => {   
            
})

module.exports = Token