// recipeIngredients.js

var express = require('express');
var router = express.Router();
var Recipe_Ingredient = require('../models/recipeIngredient');
var Ingredient = require('../models/ingredient');
var Recipe = require('../models/recipe');

// Show all ingredients in a recipe
router.get("/recipe/:id", function (req, res) {
    Recipe.findOne({where: {id: req.params.id }, include: Ingredient})
    .then(recipe => {
        res.status(200).send(JSON.stringify(recipe));
    })
    .catch( err => {
        res.status(500).send(JSON.stringify(err));
    });
});

// Show all recipes attached to an ingredient
router.get("/ingredient/:id", async function (req, res) {
    try {
        const ingredientId = req.params.id;
        const ingredientIncludingRecipes = await Ingredient.findOne({where: { id: ingredientId }, include: Recipe });

        res.status(200).send(JSON.stringify(ingredientIncludingRecipes));
    } catch (err) {
        res.status(500).send(JSON.stringify(err));
    }
});

// Add an ingredient to a recipe
router.post("/recipe/:id", async function(req, res) {
    // First we find the recipe that we want to add an ingredient to
    try {
        const recipe = await Recipe.findOne({ where: { id: req.params.id }});
        const ingredient = await Ingredient.findOne({ where: { id: req.body.ingredientId }});

        const recipeIngredient = await recipe.addIngredients(ingredient, {through: { quantity: req.body.quantity }});

        res.status(200).send(JSON.stringify(recipeIngredient));
    } catch (err) {
        res.status(500).send(JSON.stringify(err));
    }
});


module.exports = router;
