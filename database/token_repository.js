var Token = require('./Models/token')
const jwt = require('jsonwebtoken')

module.exports = {

    async addTokenToUser(idUser, newToken) {        
        var tokenObj = {
            id_user : idUser,
            token : newToken
        }

        try {            
            tokenUser = await Token.findOne({ where: {id_user: idUser} })
            if (tokenUser == null) {
                result = await Token.create(tokenObj)
            } else {
                tokenUser.token = newToken
                result = await tokenUser.save()
            }
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async findToken(token) {        
        try {                              
            result = await Token.findOne({ where: {token: token} })            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async deleteTokenUser(idUser) {
        try {
            Token.destroy( { where : { id_user : idUser } })
        } catch (error) {
            console.log(e)
        }
    }
}