const dotenv = require('dotenv')
dotenv.config()
module.exports =
{
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_USERNAME,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": process.env.DB_USERNAME,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
