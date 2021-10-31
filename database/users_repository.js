var Users = require('./Models/users')
const { Op } = require("sequelize");

module.exports = {

    async getAllUsers() {
        let result
        try {
            result = await Users.findAll()
            result.forEach(user => {
                delete user.dataValues.password
                delete user.dataValues.isadmin
                delete user.dataValues.age
                delete user.dataValues.birthdate
                delete user.dataValues.country
                delete user.dataValues.email
                delete user.dataValues.createdAt
                delete user.dataValues.updatedAt    
            });            
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },

    async getAllUsersAdmin() {
        try {
            result = await Users.findAll()
            result.forEach(user => {
                delete user.dataValues.password
            })
        } catch (error) {
            console.log(error)
        }
        return result
    },

    async getUniqueUser(username, email) {        
        let result
        try {
            result = await Users.findAll( { where : { [Op.or]: [ { username: username },{ email: email } ] }} )
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },

    async getAdminUser(username, email) {        
        let result
        try {
            result = await Users.findAll( { where : { [Op.or]: [ { username: username },{ email: email } ], [Op.and]: [ { isadmin : true } ] }} )
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },

    async addUserToDatabase(username, hashPassword, email) {
        var newUser = {
            username : username,
            password : hashPassword,
            email : email,
            isadmin : false,
            avatar : "mii_default",
            background_color : "#eb1320"
        }

        try {
            result = await Users.create(newUser)
        } catch (error) {
            
        }

        return result
    },

    async getUserByNameAdmin(username) {
        let result
        try {
            result = await Users.findOne( { where: { username: username }} )            
        } catch (error) {
            console.log(error)    
        }        
        return result
    },

    async getUserByName(username) {
        let result
        try {
            result = await Users.findOne( { where: { username: username }} )
            if (result != null) delete result.dataValues.password
        } catch (error) {
            console.log(error)    
        }        
        return result
    },

    async getUserByEmail(email) {
        let result
        try {
            result = await Users.findOne( { where: { email: email }} )
            if (result != null) delete result.dataValues.password
        } catch (error) {
            console.log(error)    
        }        
        return result
    },

    async editUser(birthdate, country, username) {
        let user
        try {
            user = await Users.findOne( { where: { username: username }} )
            user.birthdate = birthdate
            user.country = country
            user.save()
        } catch (error) {
            console.log(error)    
        }
        delete user.dataValues.password
        delete user.dataValues.isadmin
        delete user.dataValues.age
        delete user.dataValues.createdAt
        delete user.dataValues.updatedAt
        return user
    },

    async editUserAdmin(id, email, country, username) {
        let user
        try {
            user = await Users.findOne( { where: { id: id }} )
            if (await this.getUserByName(username) == null) {
                user.username = username
            }

            if (await this.getUserByEmail(email) == null) {
                user.email = email
            }   
            user.country = country
            user.save()
            delete user.dataValues.password            
        } catch (error) {
            console.log(error)
        }
        return user
    },

    async editAvatar(avatar, background, username) {
        let user
        try {
            user = await Users.findOne( { where: { username: username }} )
            user.avatar = avatar
            user.background_color = background
            user.save()
        } catch (error) {
            console.log(error)    
        }        
        return user
    },

    async getUserAvatar(idUser) {        
        try {
            result = await Users.findOne( {where : { id : idUser  } , attributes: ['id', 'username', 'avatar', 'background_color'] })            
        } catch (error) {
            console.log(error)
        }
        return result
    },

    async deleteUserAdmin(idUser, username) {
        try {           
            await Users.destroy( { where : { id : idUser } } )
        } catch (error) {
            console.log(error)
        }
    }
}