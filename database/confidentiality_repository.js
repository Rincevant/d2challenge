var Confidentiality = require('./Models/confidentiality')

module.exports = {

    async getConfidentiality(idUser) {
        try {
            confidentialityUser = await Confidentiality.findOne( { where: { id_user: idUser }} )
        } catch (error) {
            console.log(error)
        }
        return confidentialityUser
    },

    async editConfidentiality(idUser, value) {
        let confidentialityUser
        try {
            confidentialityUser = await Confidentiality.findOne( { where: { id_user: idUser }} )
            confidentialityUser.value = value
            confidentialityUser.save()
        } catch (error) {
            console.log(error)    
        }        
        return confidentialityUser
    },

    async createConfidentiality(idUser) {
        try {
            newUser = {
                id_user : idUser,
                value : 0
            }

            result = await Confidentiality.create(newUser)
        } catch (error) {
            console.log(error)
        }
        return result
    }
}