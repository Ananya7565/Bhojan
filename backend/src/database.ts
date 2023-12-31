import knex, { Knex } from 'knex';

const knexConfig: Knex.Config = {
    client: 'sqlite3',
    connection: {
      filename: 'database.db',
                },
  };

const db = knex(knexConfig);

export default db;