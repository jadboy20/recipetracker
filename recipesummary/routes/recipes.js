// recipes.js

var express = require('express');
var router = express.Router();
var { Recipe } = require('../models/recipe');

router.get("/all", function(req, res) {
    Recipe.findAll()
    .then(recipes => {
        res.status(200).send(JSON.stringify(recipes));
    })
    .catch( err => {
        res.status(500).send(JSON.stringify(err));
    });
});

router.get("/:id", function(req, res) {
    Recipe.findByPk(req.params.id)
        .then( recipe => {
            res.status(200).send(JSON.stringify(recipe));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.post("/", function(req, res) {
    Recipe.create({
            name: req.body.name,
            author: req.body.author,
            id: req.body.id
        })
        .then( recipe => {
            res.status(200).send(JSON.stringify(recipe));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/:id", function(req, res) {
    Recipe.update({
            name: req.body.name,
            author: req.body.author
        }, {
            where: { id: req.params.id}
        })
        .then( result => {
            res.status(200).send(JSON.stringify(result));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function(req, res) {
    Recipe.destroy({
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
