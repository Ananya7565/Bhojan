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
    //await db('user').where('user_id', 4).del();
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


  test('Test fetching data from the database', async () => {
    const data = await db.select('*').from('delivery_table');
    data.forEach((row) => {
      const estimatedArrivalDate = Number(row.estimated_arrival_date);
      const bookedDate = Number(row.booked_date);
      expect(estimatedArrivalDate).toBeGreaterThan(bookedDate);
    });
  });

  test('Check values of meal_category column', async () => {
    const validCategories = ['breakfast', 'lunch', 'dinner'];
    const mealCategories = await db('individual_day').pluck('meal_category');
    const isValid = mealCategories.every((category) =>
      validCategories.includes(category)
    );
    expect(isValid).toBe(true);
  });

  test('Test inserting data into the database', async () => {
    const initialData = await db('user').select('*');
    const initialCount = initialData.length;
    await db('user').insert({
      user_id: 4,
      name: 'Meena',
      password: '1234',
      address: '#23,jayanagar',
      phone_no: 23756453,
    });
    const updatedData = await db('user').select('*');
    const updatedCount = updatedData.length;
    const expectedCount = initialCount + 1;
    expect(updatedCount).toBe(expectedCount);
  });
});
