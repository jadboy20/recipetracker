const Recipe = require('./recipe');
const db = require('../database');

beforeAll(async () => {
    await Recipe.sync({ force: true });
});

test('create recipe', async () => {
    expect.assertions(4);
    const recipe = await Recipe.create({
        id: 1,
        name: 'Orange Cake',
        author: 'Dessert Person',
        serves: 5
    });
    expect(recipe.id).toEqual(1);
    expect(recipe.name).toEqual('Orange Cake');
    expect(recipe.author).toEqual('Dessert Person');
    expect(recipe.serves).toEqual(5);
});

test('get recipe', async () => {
    expect.assertions(3);
    const recipe = await Recipe.findByPk(1);
    expect(recipe.name).toEqual('Orange Cake');
    expect(recipe.author).toEqual('Dessert Person');
    expect(recipe.serves).toEqual(5);
});

test('delete ingredient', async () => {
    expect.assertions(1);
    await Recipe.destroy({
        where: {
            id: 1
        }
    });
    const recipe = await Recipe.findByPk(1);
    expect(recipe).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
