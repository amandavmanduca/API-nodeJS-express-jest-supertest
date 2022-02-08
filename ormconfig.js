const database = {
  development: process.env.DB_DATABASE,
  test: process.env.DB_DATABASE_TEST,
}

module.exports = {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    database: database[process.env.NODE_ENV] || process.env.DB_DATABASE,
    entities: ['src/modules/**/entities/*.ts'],
    synchronize: true,
    logging: true,
};
  