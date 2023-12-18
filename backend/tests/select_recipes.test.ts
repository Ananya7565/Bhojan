import knex, { Knex } from 'knex';
import path from 'path';
import configurations from '../knexfile';

let db: Knex;

beforeAll(async () => {
  db = knex(configurations.testing);
  await db.migrate.latest({
    directory: path.join(__dirname, '..', 'src', 'migrations'),
  });
});

afterAll(async () => {
  await db.destroy();
});

describe('Database Tests', () => {
  beforeEach(async () => {
    await db.seed.run({
      directory: path.join(__dirname, '..', 'seeds'),
    });
  });

  afterEach(async () => {
    await db('user').truncate();
    await db('preferences').truncate();
    await db('ingredients_used').truncate();
    await db('calendar').truncate();
    await db('individual_day').truncate();
    await db('delivery_table').truncate();
    await db('order_master').truncate();
    await db('recipe').truncate();
    await db('order_details').truncate();
    await db('sqlite_sequence').truncate();
  });


  test('Create Recipe', async () => {
      const newRecipe = {
          dietary_lifestyle: 'vegan',
          diet_followed: 'low fat',
          image: '/views/carrot.png',
          instructions: '1 carrot ,1 onion',
          cook_time: 5,
          name_of_recipe: 'carrot salad',
          description:'tasty',
          season:'monsoon'
      };
      
      var recipeId = 4;
      await db('recipe').insert({ recipe_id: recipeId, ...newRecipe });
      const createdRecipe = await db('recipe').where({ recipe_id: recipeId }).first();
      expect(createdRecipe).toBeDefined();
      expect(createdRecipe.name_of_recipe).toBe('carrot salad');
  });

  test('Read Recipe', async () => {
    const recipe = await db('recipe')
      .select('name_of_recipe')
      .where({
          dietary_lifestyle: 'vegan',
          diet_followed: 'low fat',
      })
      .first();
    expect(recipe).toBeDefined();
    expect(recipe.name_of_recipe).toBe('potato rice');
  });

  test('Update Recipe', async () => {
    const updatedRecipeName = 'mango cupcake';
    await db('recipe')
      .update({ name_of_recipe: updatedRecipeName })
      .where({
        dietary_lifestyle: 'non-vegetarian',
        diet_followed: 'low sugar',
      });

    const recipe = await db('recipe')
      .select('name_of_recipe')
      .where({
        dietary_lifestyle: 'non-vegetarian',
        diet_followed: 'low sugar',
      })
      .first();

    expect(recipe).toBeDefined();
    expect(recipe.name_of_recipe).toBe(updatedRecipeName);
  });

  test('Delete Recipe', async () => {
    await db('recipe')
      .where({
        dietary_lifestyle: 'vegan',
        diet_followed: 'low fat',
      })
      .del();

    const recipe = await db('recipe')
      .select('name_of_recipe')
      .where({
        dietary_lifestyle: 'vegan',
        diet_followed: 'low fat',
      })
      .first();

    expect(recipe).toBeUndefined();
  });
});
