// ingredients.js

var express = require('express');
var router = express.Router();
var Ingredient = require('../models/ingredient');

router.get("/all", function(req, res) {
    Ingredient.findAll()
    .then(ingredients => {
        res.status(200).send(JSON.stringify(ingredients));
    })
    .catch( err => {
        res.status(500).send(JSON.stringify(err));
    });
});

router.get("/:id", function(req, res) {
    Ingredient.findByPk(req.params.id)
        .then( ingredient => {
            res.status(200).send(JSON.stringify(ingredient));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/", function(req, res) {
    Ingredient.create({
        name: req.body.name,
        id: req.body.id
        })
        .then( ingredient => {
            res.status(200).send(JSON.stringify(ingredient));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function(req, res) {
    Ingredient.destroy({
        where: {
            id: req.params.id
        }
        })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
