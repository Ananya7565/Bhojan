import { GraphQLServer } from 'graphql-yoga'; //GraphQLServer is a class from the graphql-yoga package
import knex,{Knex} from 'knex';
import { typeDefs, resolvers } from './schema';
import configurations from './knexfile';
import { request } from 'graphql-request';

let db: Knex;
db = knex(configurations.development);

const createContext = () => ({   //stores the db variable,it has the knex database connection 
  db,
});

const executeGraphQLQuery = async (query: string) => {
  const endpoint = 'http://localhost:4000/graphql';
  try {
    const data = await request(endpoint, query);
    return data;
  } catch (error) {
    console.error('Error executing GraphQL query:', error);
    throw error;
  }
};

const server = new GraphQLServer({   //holds the fully configured GraphQL server instance
  typeDefs,
  resolvers,
  context: createContext, 
});


const startServer = async () => {      //this function will start the graphql function
  try {
    const options = {    //the options object will have various settings for the server
      port: 4000,        //The server will run on port 4000
      endpoint: '/graphql',   //The endpoint where GraphQL queries will be sent
      //playground: '/ananya',   //takes us to graphql playground where we can test our queries
      
    };

    
    await server.start(options);   //start the graphql server

    
    const { port } = options;
    //const {playground } = options;
    const url = `http://localhost:${port}`;

    console.log(`Server ready at ${url}`);
    const query = `
    query {
      getUserData {
        user {
          user_id
          name
          password
          address
          phone_no
        }
        preferences {
          user_id
          diet_followed
          allergies
          dietary_lifestyle
          no_of_people
        }
        ingredients_used {
        ingredient_id
        recipe_id
        ingredient_name
        quantity
        unit
        no_of_people
      }
        recipe {
        recipe_id
        dietary_lifestyle
        diet_followed
        image
        instructions
        cook_time
        name_of_recipe
        description
        season
      }
        calendar {
        user_id
        date
        no_of_days
        duration
      }
        order_details {
        order_id
        ingredients
        name
        detail_id
        total_cost
      }
        individual_day {
          recipe_id
          recipe_name
          meal_category
          date
        }
        order_master {
        user_id
        order_id
        date
      }
        delivery_table {
        order_id
        delivery_partner
        address
        estimated_arrival_date
        booked_date
      }
      }
    }    
    `;
    interface QueryResult {
      queryResult: {
        user: Array<any>; // Adjust the type if you have a specific type for user
        preferences: Array<any>; // Adjust the type if you have a specific type for preferences
        ingredients_used: Array<any>;
        recipe: Array<any>;
        calendar: Array<any>;
        order_details: Array<any>;
        individual_day: Array<any>;
        order_master: Array<any>;
        delivery_table: Array<any>;
      };
    }
    const result = await executeGraphQLQuery(query) as QueryResult;
    console.log('GraphQL Query Result:', result);
    const users = result.queryResult.user; // This is an array of user objects
    const preferences = result.queryResult.preferences;
    const ingredients_used = result.queryResult.ingredients_used;
    const recipe = result.queryResult.recipe;
    const calendar = result.queryResult.calendar;
    const order_details = result.queryResult.order_details;
    const individual_day = result.queryResult.individual_day;
    const order_master = result.queryResult.order_master;
    const delivery_table = result.queryResult.delivery_table;
    

// Accessing data within each user object
/*
users.forEach((user: any) => {
  const userId = user.user_id;
  const name = user.name;
  const password = user.password;
  const address = user.address;
  const phoneNo = user.phone_no;

  console.log(`User ID: ${userId}`);
  console.log(`Name: ${name}`);
  console.log(`Password: ${password}`);
  console.log(`Address: ${address}`);
  console.log(`Phone Number: ${phoneNo}`);
});*/
const getUserData = () => {
  return {
    users,
    preferences,
    ingredients_used,
    recipe,
    calendar,
    order_details,
    individual_day,
    order_master,
    delivery_table
  };
};
module.exports = {
  getUserData,
  startServer, // Keep the startServer function for starting the GraphQL server
};
  } 
  catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();