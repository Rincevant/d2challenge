var Friends_pending = require('./Models/friends_pending')
var Users = require('../database/users_repository')
var Users_friends = require('../database/users_friends_repository')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    async invitationFriend(idContact, friendUsername, idUser) {
        let newInvitation = {
            id_user: idUser,
            id_contact: idContact,
            username_contact: friendUsername, 
            state : "pending"          
        }
        try {
            // Verify if invitation is unique 
            invitations = await Friends_pending.findAll({ where: { id_user: { [Op.or]: [idUser, idContact] }, id_contact : { [Op.or]: [idUser, idContact] } } });
            
            
            for (const invitation of invitations) {
                if (invitation.state === 'accepted' || invitation.state === 'pending')
                    return false
            }

            result = await Friends_pending.create( newInvitation )          
        } catch (error) {
            console.log(error)    
        }        
        return result 
    },

    async getNumbersInvitation(idUser) {
        try {
            result = await Friends_pending.findAll( { where: { id_contact: idUser, state : 'pending' }} )                    
        } catch (error) {
            console.log(error)    
        }        
        return result.length
    },

    async getAllInvitations(idUser) {
        allInvitation = []
        try {
            result = await Friends_pending.findAll( { where: { id_contact: idUser, state : 'pending' }} )
            
            for (const user of result) {
                invitation = await Users.getUserAvatar(user.id_user)
                invitation.dataValues["idInvitation"] = user.id
                allInvitation.push(invitation.dataValues)
            }            
             
        } catch (error) {
            console.log(error)
        }        
        return allInvitation
    },

    async acceptInvitation(idInvitation, idUser, idFriend) {
        try {
            invitation = await Friends_pending.findOne( { where : {id : idInvitation } })
            invitation.state = 'accepted'
            invitation.save()

            result = await Users_friends.addNewFriends(idUser, idFriend)

        } catch (error) {
            console.log(error)
        }
        return true
    },

     async refuseInvitation(idInvitation) {
        try {
            invitation = await Friends_pending.findOne( { where : {id : idInvitation, state : 'pending' } })
            invitation.state = 'refused'
            invitation.save()
        } catch (error) {
            console.log(error)
        }
        return true
    },

    async deleteUserPendings(idUser) {
        try {
            Friends_pending.destroy( { where : { [Op.or]: [ { id_user : idUser },{ id_contact : idUser } ] } })
        } catch (error) {
            console.log(error)
        }
    }
}