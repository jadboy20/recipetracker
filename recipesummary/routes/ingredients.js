// ingredients.js

var express = require('express');
var router = express.Router();
var db = require('../database.js');

router.get("/all", function(req, res) {
    db.Ingredient.findAll()
    .then(ingredients => {
        res.status(200).send(JSON.stringify(ingredients));
    })
    .catch( err => {
        res.status(500).send(JSON.stringify(err));
    });
});

router.get("/:id", function(req, res) {
    db.Ingredient.findByPk(req.params.id)
        .then( ingredient => {
            res.status(200).send(JSON.stringify(ingredient));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/", function(req, res) {
    db.Ingredient.create({
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
    db.Ingredient.destroy({
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
