module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "tdht.27092001",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};