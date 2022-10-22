import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/db.sqlite3",
  logging: false,
});

export default sequelize;
