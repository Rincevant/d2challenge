const Sequelize = require('sequelize');
const db = require('../connexion')

const Confidentiality = db.define('confidentiality', {
    id_user: {
        type: Sequelize.INTEGER      
    },
    value: {
        type: Sequelize.INTEGER      
    }
});

Confidentiality.sync().then(res => {   
            
})

module.exports = Confidentiality