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
        delivery_partner: 'swiggy', 
        address: 'padmanabhanagar', 
        estimated_arrival_date: 22, 
        booked_date: 14
      };
      
      var orderId = 4;
      await db('delivery_table').insert({ order_id: orderId, ...newRecipe });
      const createdRecipe = await db('delivery_table').where({ order_id: orderId }).first();
      expect(createdRecipe).toBeDefined();
      expect(createdRecipe.delivery_partner).toBe('swiggy');
  });

  test('Read Order', async () => {
    const recipe = await db('delivery_table')
      .select('delivery_partner')
      .where({
        
        address: 'padmanabhanagar', 
        estimated_arrival_date: 22, 
        booked_date: 13 
      })
      .first();
    expect(recipe).toBeDefined();
    expect(recipe.delivery_partner).toBe('swiggy');
  });

  test('Update order', async () => {
    const updatedRecipeName = 'zomato';
    await db('delivery_table')
      .update({ delivery_partner: updatedRecipeName })
      .where({
        address: 'padmanabhanagar', 
        estimated_arrival_date: 22, 
        booked_date: 13 
      });

    const recipe = await db('delivery_table')
      .select('delivery_partner')
      .where({
        address: 'padmanabhanagar', 
        estimated_arrival_date: 22, 
        booked_date: 13 

      })
      .first();

    expect(recipe).toBeDefined();
    expect(recipe.delivery_partner).toBe(updatedRecipeName);
  });

  test('Delete Order', async () => {
    await db('delivery_table')
      .where({
        address: 'padmanabhanagar', 
        estimated_arrival_date: 22, 
        booked_date: 13 
      })
      .del();

    const recipe = await db('delivery_table')
      .select('delivery_partner')
      .where({
        address: 'padmanabhanagar', 
        estimated_arrival_date: 22, 
        booked_date: 13 
      })
      .first();

    expect(recipe).toBeUndefined();
  });
});
