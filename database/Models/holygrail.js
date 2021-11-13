const Sequelize = require('sequelize');
const db = require('../connexion')

const Holygrail = db.define('holygrail', {
    id_user: {
        type: Sequelize.INTEGER   
    },
    holygrail: {
        type: Sequelize.TEXT      
    }
}, {
    timestamps: false
});

Holygrail.sync().then(res => {
})

module.exports = Holygrail