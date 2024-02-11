const { Op } = require("sequelize");
var UniqueItems = require('./Models/uniques_items')
var namesDict = require('./Models/namesDict')

module.exports = { 

    async getAllUnique() {
        let result
        try {
            result = await UniqueItems.findAll()            
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },

    async getAllUniqueArmors() {
        let result
        try {
            result = await UniqueItems.findAll( { where: { kind: "Armor" }} )
            
            // Exemple traduction des noms
            /*result.forEach(element => {
                if(namesDict.names.get(element.name) != undefined ) {
                    element.name = namesDict.names.get(element.name)                    
                }
            });    */   
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },

    async getAllUniqueWeapons() {
        let result
        try {
            result = await UniqueItems.findAll( { where: { kind: "Weapon" }} )       
        } catch (error) {
            console.log(error)    
        }        
        return result   
    },

    async getAllUniqueOthers() {
        let result
        try {
            result = await UniqueItems.findAll( { where: { kind: "Other" }} )       
        } catch (error) {
            console.log(error)    
        }        
        return result   
    }
}