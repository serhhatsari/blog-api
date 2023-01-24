const { Sequelize } = require('sequelize');
const config = require('../config');

// Connect to database
const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: "mysql",
    }
);


if (process.env.NODE_ENV === "development") {
    async function syncDatabase() {
        await sequelize.sync({ force: true });
    }
    console.log("Syncing database...");
    syncDatabase();
}


module.exports = sequelize;