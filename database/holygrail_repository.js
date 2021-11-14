var Holygrail = require('./Models/holygrail')
const { Op } = require("sequelize");

module.exports = {

    async getAllHolygrail() {
        let result
        try {
            result = await Holygrail.findAll()                    
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },    

    async addHolyGrailToDatabase(idUser) {
        var template = require('./Models/template_own')
        
        var holygrail = {
            id_user : idUser,
            holygrail : JSON.stringify(template)
        }

        try {
            result = await Holygrail.create(holygrail)
        } catch (error) {
            console.log(error)
        }
        
        return result
    },

    async getTemplateByIdUser(idUser) {
        let result
        try {
            result = await Holygrail.findOne( { where: { id_user: idUser }} )           
        } catch (error) {
            console.log(error)    
        }        
        return result
    },

    async editHolyGrail(holygrailTemplate, idUser) {
        let holy
        try {
            holy = await Holygrail.findOne( { where: { id_user: idUser }} )
            holy.holygrail = JSON.stringify(holygrailTemplate)
            holy.save()
        } catch (error) {
            console.log(error)    
        }
        return holy
    }
}