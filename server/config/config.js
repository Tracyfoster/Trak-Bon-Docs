require('dotenv').config();

module.exports = {

  development: {
    username: 'andeladeveloper',
    password: null,
    database: 'trakbon',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
