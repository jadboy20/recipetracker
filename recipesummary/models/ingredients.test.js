const Ingredient = require('./ingredient');
const db = require('../database')

beforeAll(async () => {
    await Ingredient.sync({ force: true });
});

test('create ingredient', async () => {
    expect.assertions(1);
    const ingredient = await Ingredient.create({
        id: 1,
        name: 'Orange',
    });
    expect(ingredient.id).toEqual(1);
});

test('get ingredient', async () => {
    expect.assertions(1);
    const ingredient = await Ingredient.findByPk(1);
    expect(ingredient.name).toEqual('Orange');
});

test('delete ingredient', async () => {
    expect.assertions(1);
    await Ingredient.destroy({
        where: {
            id: 1
        }
    });
    const ingredient = await Ingredient.findByPk(1);
    expect(ingredient).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
