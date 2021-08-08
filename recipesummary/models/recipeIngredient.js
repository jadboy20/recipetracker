const {
    Model,
    DataTypes,
    Deferrable,
    Sequelize
} = require('sequelize');

const { sequelize } = require('../database');
const Ingredient = require('./ingredient');
const Recipe = require('./recipe');

const Recipe_Ingredient = sequelize.define('Recipe_Ingredient', {
    quantity: DataTypes.FLOAT
}, { timestamps: false });

Ingredient.belongsToMany(Recipe, {through: Recipe_Ingredient});
Recipe.belongsToMany(Ingredient, {through: Recipe_Ingredient});


module.exports = Recipe_Ingredient;

