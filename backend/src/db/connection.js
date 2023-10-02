import { Sequelize } from "sequelize";

import accessEnv from "#root/helpers/accessEnv";

const DB_URI = accessEnv("DB_URI");
const TEST_DB_URI = accessEnv("TEST_DB_URI");
const NODE_ENV = accessEnv("NODE_ENV", "development");

const databaseURL = NODE_ENV === "test" ? TEST_DB_URI : DB_URI;

const sequelize = new Sequelize(databaseURL, {
  dialectOptions: {
    charset: "utf8",
    multipleStatements: true,
  },
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize;
