import { Knex } from 'knex';

const tableDefinitions: { [tableName: string]: (table: Knex.CreateTableBuilder) => void } = {

  delivery_table : (table) => {
      table.increments('order_id').primary();
      table.string('delivery_partner',255);
      table.string('address',255);
      table.string('estimated_arrival_date',255);
      table.string('booked_date',255);
    
    },

  user: (table) => {
      table.increments('user_id').primary();
      table.string('name', 255);
      table.string('password', 255);
      table.string('address', 255);
      table.integer('phone_no', 255);
  },
  preferences: (table) => {
      table.increments('user_id').primary();
      table.string('diet_followed', 255);
      table.string('allergies', 255);
      table.string('dietary_lifestyle', 255);
      table.integer('no_of_people', 255);
  },
  ingredients_used : (table) => {
      table.increments('ingredient_id').primary();
      table.integer('recipe_id', 255);
      table.string('ingredient_name', 255);
      table.integer('quantity', 255);
      table.string('unit',255);
      table.string('name_of_recipe',255);
      table.integer('no_of_people', 255);
  },
  recipe : (table) => {
      table.increments('recipe_id').primary();
      table.string('dietary_lifestyle', 255);
      table.string('diet_followed', 255);
      table.string('image', 255);
      table.string('instructions',255);
      table.integer('cook_time', 255);
      table.string('name_of_recipe',255);
      table.string('description',255);
      table.string('season',255);;
  },
  
  calendar : (table) => {
      table.increments('user_id').primary();
      table.date('date');
      table.integer('no_of_days', 255);
      table.integer('duration',255);
  },
  order_details : (table) => {
      table.increments('order_id').primary();
      table.string('ingredients', 255);
      table.string('name', 255);
      table.integer('detail_id', 255);
      table.integer('total_cost',255);
  },
  individual_day : (table) => {
      table.increments('recipe_id').primary();
      table.string('recipe_name', 255);
      table.string('meal_category', 255);
      table.date('date');
  },
  order_master : (table) => {
      table.increments('user_id').primary();
      table.integer('order_id', 255);
      table.date('date');
  },
  
};

export default tableDefinitions;
