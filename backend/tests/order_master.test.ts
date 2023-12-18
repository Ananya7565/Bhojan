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
          
          order_id:3,
          date:'2023-08-09'
      };
      
      var userId = 4;
      await db('order_master').insert({ user_id: userId, ...newRecipe });
      const createdRecipe = await db('order_master').where({ user_id: userId }).first();
      expect(createdRecipe).toBeDefined();
      expect(createdRecipe.date).toBe('2023-08-09');
  });

  test('Read Order', async () => {
    const recipe = await db('order_master')
      .select('date')
      .where({
          user_id: 1,
          order_id: 2,
      })
      .first();
    expect(recipe).toBeDefined();
    expect(recipe.date).toBe('2023-12-23');
  });

  test('Update Order', async () => {
    const updatedRecipeName = '2022-08-09';
    await db('order_master')
      .update({ date: updatedRecipeName })
      .where({
        user_id: 1,
        order_id: 2,
      });

    const recipe = await db('order_master')
      .select('date')
      .where({
        user_id:1,
        order_id: 2,

      })
      .first();

    expect(recipe).toBeDefined();
    expect(recipe.date).toBe(updatedRecipeName);
  });

  test('Delete Order', async () => {
    await db('order_master')
      .where({
        user_id:1,
        order_id: 2,
      })
      .del();

    const recipe = await db('order_master')
      .select('date')
      .where({
        user_id:1,
        order_id: 2,
      })
      .first();

    expect(recipe).toBeUndefined();
  });
});
