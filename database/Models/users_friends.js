const Sequelize = require('sequelize');
const db = require('../connexion')

const Users_friends = db.define('users_friends', {
    id_user: {
        type: Sequelize.INTEGER      
    },
    id_contact: {
        type: Sequelize.INTEGER      
    },
    username_contact: {
        type: Sequelize.STRING
    }
});

Users_friends.sync().then(res => {   
            
})

module.exports = Users_friends