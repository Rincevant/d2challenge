const Sequelize = require('sequelize');
const db = require('../connexion')

const Friends_pending = db.define('friends_pending', {
    id_user: {
        type: Sequelize.INTEGER      
    },
    id_contact: {
        type: Sequelize.INTEGER      
    },
    username_contact: {
        type: Sequelize.STRING
    },
    state : {
        type: Sequelize.STRING
    }
});

Friends_pending.sync().then(res => {   
            
})

module.exports = Friends_pending