var db = require('../database.js');
const Ingredient = require('../models/ingredient');
const Recipe  = require('../models/recipe');
const Recipe_Ingredient = require('../models/recipeIngredient');
const { Op } = require("sequelize");

const syncDatabase = async () => {
   /* await db.sequelize.sync();
    await Ingredient.sync();
    await Recipe.sync();
    await Recipe_Ingredient.sync();*/

    try {
        const recipe = await Recipe.findOne({
            where: { id: 1},
            include: Ingredient
        });
        console.log(recipe && recipe.Ingredients);
    } catch (err) {
        console.log("Caught error");
        console.log(err);
    }


    // const recipe = await Recipe.findOne({
    //     where: { name: {[Op.like]: '%cake%'}},
    //     include: Ingredient
    // });
}

syncDatabase();
/*
db.sequelize.sync();
Ingredient.sync()
.then(result => {console.log(result)});
Recipe.sync()
.then( result => {console.log(result)});
Recipe_Ingredient.sync();

const cream = await Ingredient.create({name: "Cream"});
const vanillaCake = await Recipe.create({name: "Old Fashioned Vanilla Cake", author: "Nadine Ingram"});

console.log(vanillaCake);
vanillaCake.addIngredients(cream, {through: {quantity: 1.0}});

const result = Ingredient.findOne({where: {name: "cream"}, include: Recipe});

console.log(result);
*/
