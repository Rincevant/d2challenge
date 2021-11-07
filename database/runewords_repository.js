const { Op } = require("sequelize");
var Runewords = require('./Models/runewords')

module.exports = { 

    async getAllRunewords() {
        let result
        try {
            result = await Runewords.findAll()            
        } catch (error) {
            console.log(error)    
        }        
        return result   
    }
    
}