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


  test('Create preference', async () => {
      const newRecipe = {
          diet_followed: 'low fat',
          allergies: 'peanuts',
          dietary_lifestyle: 'vegan',
          no_of_people: 3
      };
      
      var userId = 4;
      await db('preferences').insert({ user_id: userId, ...newRecipe });
      const createdRecipe = await db('preferences').where({ user_id: userId }).first();
      expect(createdRecipe).toBeDefined();
      expect(createdRecipe.diet_followed).toBe('low fat');
  });

  test('Read preference', async () => {
    const preference = await db('preferences')
      .select('allergies')
      .where({
          dietary_lifestyle: 'vegan',
          diet_followed: 'no carbs',
      })
      .first();
    expect(preference).toBeDefined();
    expect(preference.allergies).toBe('peanuts');
  });

  test('Update preference', async () => {
    const updatedpreference = 'orange';
    await db('preferences')
      .update({ allergies: updatedpreference })
      .where({
        dietary_lifestyle: 'vegan',
        diet_followed: 'no carbs',
      });

    const preference = await db('preferences')
      .select('allergies')
      .where({
        dietary_lifestyle: 'vegan',
        diet_followed: 'no carbs',
      })
      .first();

    expect(preference).toBeDefined();
    expect(preference.allergies).toBe(updatedpreference);
  });

  test('Delete preference', async () => {
    await db('preferences')
      .where({
        dietary_lifestyle: 'vegan',
        diet_followed: 'no carbs',
      })
      .del();

    const preference = await db('preferences')
      .select('allergies')
      .where({
        dietary_lifestyle: 'vegan',
        diet_followed: 'no carbs',
      })
      .first();

    expect(preference).toBeUndefined();
  });
});
