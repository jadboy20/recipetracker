const {
    Model,
    DataTypes,
    Deferrable,
    Sequelize
} = require("sequelize");

const { sequelize } = require('../database')

class Recipe extends Model {

    getName() {
        return this.name;
    }

    getAuthor() {
        return this.author;
    }

    getServingSize() {
        return this.serves;
    }

    getId() {
        return this.id;
    }
}

Recipe.init({
    name: Sequelize.TEXT,
    author: Sequelize.TEXT,
    serves: Sequelize.INTEGER
}, { sequelize});


module.exports = Recipe;