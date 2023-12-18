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


  test('Create order', async () => {
      const newRecipe = {
          
        ingredients: 'rice,wheat',
        name: 'roti', 
        detail_id: 4, 
        total_cost: 4
      };
      
      var orderId = 4;
      await db('order_details').insert({ order_id: orderId, ...newRecipe });
      const createdRecipe = await db('order_details').where({ order_id: orderId }).first();
      expect(createdRecipe).toBeDefined();
      expect(createdRecipe.name).toBe('roti');
  });

  test('Read Order', async () => {
    const recipe = await db('order_details')
      .select('name')
      .where({
        ingredients: 'apple,orange', 
        detail_id: 3, 
        total_cost: 5
      })
      .first();
    expect(recipe).toBeDefined();
    expect(recipe.name).toBe('cake');
  });

  test('Update Recipe', async () => {
    const updatedRecipeName = 'chocolate cake';
    await db('order_details')
      .update({ name: updatedRecipeName })
      .where({
        ingredients: 'apple,orange', 
        detail_id: 3, 
        total_cost: 5
      });

    const recipe = await db('order_details')
      .select('name')
      .where({
        ingredients: 'apple,orange', 
        detail_id: 3, 
        total_cost: 5

      })
      .first();

    expect(recipe).toBeDefined();
    expect(recipe.name).toBe(updatedRecipeName);
  });

  test('Delete Order', async () => {
    await db('order_details')
      .where({
        ingredients: 'apple,orange', 
        detail_id: 3, 
        total_cost: 5
      })
      .del();

    const recipe = await db('order_details')
      .select('name')
      .where({
        ingredients: 'apple,orange', 
        detail_id: 3, 
        total_cost: 5
      })
      .first();

    expect(recipe).toBeUndefined();
  });
});
