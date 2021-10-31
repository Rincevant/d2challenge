const Sequelize = require('sequelize');
const db = require('../connexion')

const Users = db.define('users', {
    username: {
        type: Sequelize.STRING   
    },
    email: {
        type: Sequelize.STRING      
    },
    country: {
        type: Sequelize.STRING
    },
    age : {
        type: Sequelize.INTEGER
    },
    birthdate : {
        type: Sequelize.DATE
    },
    password: {
        type: Sequelize.STRING
    },
    isadmin: {
        type: Sequelize.BOOLEAN
    },    
    avatar: {
        type: Sequelize.STRING      
    }
});

Users.sync().then(res => {
})

module.exports = Users
