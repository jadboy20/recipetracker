const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create ingredient', async () => {
    expect.assertions(1);
    const ingredient = await db.Ingredient.create({
        id: 1,
        name: 'Orange',
    });
    expect(ingredient.id).toEqual(1);
});

test('get ingredient', async () => {
    expect.assertions(1);
    const ingredient = await db.Ingredient.findByPk(1);
    expect(ingredient.name).toEqual('Orange');
});

test('delete ingredient', async () => {
    expect.assertions(1);
    await db.Ingredient.destroy({
        where: {
            id: 1
        }
    });
    const ingredient = await db.Ingredient.findByPk(1);
    expect(ingredient).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
