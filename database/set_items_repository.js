const { Op } = require("sequelize");
var Set = require('./Models/set_items')

module.exports = { 

    async getAllSet() {
        let result
        try {
            result = await Set.findAll()            
        } catch (error) {
            console.log(error)    
        }        
        return result   
    }
    
}