const { Op } = require("sequelize");
var UniqueItems = require('./Models/uniques_items')

module.exports = { 

    async getAllUnique() {
        let result
        try {
            result = await UniqueItems.findAll()            
        } catch (error) {
            console.log(error)    
        }        
        return result   
    }
}