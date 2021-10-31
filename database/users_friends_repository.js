var Users_friends = require('./Models/users_friends')
var Users = require('../database/users_repository')
const { Op } = require("sequelize");

module.exports = {

    async getAllFriends() {
        let result
        try {
            result = await Users_friends.findAll()
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },

    async getFriendsByUsername(idUser) {
        let friendsList = []
        try {
            friends = await Users_friends.findAll( { where: { id_user: idUser }} )            
            for (let ami of friends) {
               avatarFriend = await Users.getUserAvatar(ami.id_contact)               
               friendsList.push(avatarFriend)
            }
        } catch (error) {
            console.log(error)    
        }        
        return friendsList   
    },

    async addNewFriends(idUser, idFriend) {
        try {
            user = await Users.getUserAvatar(idUser)
            friend = await Users.getUserAvatar(idFriend)

            userSide = {
                id_user : user.id,
                id_contact : idFriend,
                username_contact : friend.username,
                avatar : friend.avatar,
                background_color : friend.background_color
            }

            friendSide = {
                id_user : idFriend,
                id_contact : idUser,
                username_contact : user.username,
                avatar : user.avatar,
                background_color : user.background_color
            }

            await Users_friends.create(userSide)
            await Users_friends.create(friendSide)


        } catch (error) {
            console.log(error)
        }

        return true
    },

    async deleteUserFriends(idUser) {
        try {
            await Users_friends.destroy( { where : { [Op.or]: [ { id_user : idUser },{ id_contact : idUser }] } })
        } catch (error) {
            console.log(error)
        }
    }

    
}