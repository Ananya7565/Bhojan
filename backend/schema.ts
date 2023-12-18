//import { gql } from 'apollo-server';
import { gql } from 'graphql-tag';
import knex from 'knex';

const typeDefs = gql`
  type user {
    user_id: ID
    name: String
    password: String
    address: String
    phone_no: Int
  }

  type preferences {
    user_id: ID
    diet_followed: String
    allergies: String
    dietary_lifestyle: String
    no_of_people: Int
  }

  type ingredients_used {
    ingredient_id: ID
    recipe_id: Int
    ingredient_name: String
    quantity: Int
    unit: String
    name_of_recipe: String
    no_of_people: Int
  }

  type recipe {
    recipe_id: ID
    dietary_lifestyle: String
    diet_followed: String
    image: String
    instructions: String
    cook_time: Int
    name_of_recipe: String
    description: String
    season: String
  }

  type calendar {
    user_id: ID
    date: String
    no_of_days: Int
    duration: Int
  }

  type order_details {
    order_id: ID
    ingredients: String
    name: String
    detail_id: Int
    total_cost: Int
  }

  type individual_day {
    recipe_id: Int
    recipe_name: String
    meal_category: String
    date: String
  }

  type order_master {
    user_id: ID
    order_id: Int
    date: String
  }

  type delivery_table {
    order_id: ID
    delivery_partner: String
    address: String
    estimated_arrival_date: String
    booked_date: String
  }

  type QueryResult {
    user: [user!]!
    preferences: [preferences!]!
    recipe: [recipe!]!
    order_master: [order_master!]!
    delivery_table: [delivery_table!]!
    ingredients_used: [ingredients_used!]!
    order_details: [order_details!]!
    individual_day: [individual_day!]!
    calendar: [calendar!]!
  }

  type Query {
    queryResult: QueryResult!
  }
`;

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'data_bhojan.db',
  },
});

const resolvers = {
  Query: {
  queryResult: async () => {
    try {
      const user = await db.select('*').from('user');
      const preferences = await db.select('*').from('preferences');
      const recipe = await db.select('*').from('recipe');
      const order_master = await db.select('*').from('order_master');
      const delivery_table = await db.select('*').from('delivery_table');
      const ingredients_used = await db.select('*').from('ingredients_used');
      const order_details = await db.select('*').from('order_details');
      const individual_day = await db.select('*').from('individual_day');
      const calendar = await db.select('*').from('calendar');

      return {
        user,
        preferences,
        recipe,
        order_master,
        delivery_table,
        ingredients_used,
        order_details,
        individual_day,
        calendar,
      };
    } catch (error) {
      console.error('There is an error:', error);
      throw error;
    }
}
}
}

export { typeDefs, resolvers };
