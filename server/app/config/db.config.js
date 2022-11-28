module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "VinhKhue191201.",
  DB: "db_test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
