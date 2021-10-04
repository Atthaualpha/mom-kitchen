function getDialectOptions() {
  if (process.env.NODE_ENV == 'dev') {
    return {};
  } else {
    return {
      ssl: {
        require: new Boolean(process.env.DB_SSL),
        rejectUnauthorized: false,
      },
    };
  }
}

export default () => ({
  database: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: getDialectOptions(),
  },
});
