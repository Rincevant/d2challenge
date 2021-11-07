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
    },

    async getAllUniqueArmors() {
        let result
        try {
            result = await UniqueItems.findAll( { where: { kind: "Armor" }} )       
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