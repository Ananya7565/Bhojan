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


  test('Create date', async () => {
      const newRecipe = {
        date: '2023-11-22', 
        no_of_days: 2, 
        duration: 4
      };
      
      var userId = 4;
      await db('calendar').insert({ user_id: userId, ...newRecipe });
      const createdRecipe = await db('calendar').where({ user_id: userId }).first();
      expect(createdRecipe).toBeDefined();
      expect(createdRecipe.duration).toBe(4);
  });

  test('Read date', async () => {
    const recipe = await db('calendar')
      .select('duration')
      .where({
        
        date: '2022-10-23', 
        no_of_days: 2,
      })
      .first();
    expect(recipe).toBeDefined();
    expect(recipe.duration).toBe(3);
  });

  test('Update date', async () => {
    const updatedRecipeName = 7;
    await db('calendar')
      .update({ duration: updatedRecipeName })
      .where({
        date: '2021-1-12', 
        no_of_days: 1, 
        
      });

    const recipe = await db('calendar')
      .select('duration')
      .where({
        date: '2021-1-12', 
        no_of_days: 1, 

      })
      .first();

    expect(recipe).toBeDefined();
    expect(recipe.duration).toBe(updatedRecipeName);
  });

  test('Delete date', async () => {
    await db('calendar')
      .where({
        date: '2023-11-22', 
        no_of_days: 2,
      })
      .del();

    const recipe = await db('calendar')
      .select('duration')
      .where({
        date: '2023-11-22', 
        no_of_days: 2,
      })
      .first();

    expect(recipe).toBeUndefined();
  });
});
