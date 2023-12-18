import { Knex } from 'knex';
import path from 'path';

const developmentConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'data_bhojan.db'),
  },
  migrations: {
    directory: path.join(__dirname, 'src', 'migrations'),
    extension: 'ts',
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
  useNullAsDefault: true,
};

const testingConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'tests' , 'data_bhojan_test.db'),
  },
  migrations: {
    directory: path.join(__dirname, 'src', 'migrations'),
    extension: 'ts',
  },
  /*
  seeds: {
    directory: path.join(__dirname, 'src', 'seeds'),
  },*/
  useNullAsDefault: true,
};

const configurations: Record<string, Knex.Config> = {
  development: developmentConfig,
  testing: testingConfig,
};

export default configurations;
