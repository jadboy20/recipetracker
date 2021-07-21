// database.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || '',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });
const Ingredient = sequelize.define('Ingredient', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Recipe = sequelize.define('Recipe', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = {
    sequelize: sequelize,
    Ingredient: Ingredient,
    Recipe: Recipe
};
