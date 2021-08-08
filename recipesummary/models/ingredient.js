const {
    Model,
    DataTypes,
    Deferrable,
    Sequelize
} = require("sequelize");

const { sequelize } = require('../database')

class Ingredient extends Model {

    getName() {
        return this.name;
    }
}

Ingredient.init({
    name: Sequelize.TEXT,
}, {
    sequelize
});

module.exports = Ingredient;