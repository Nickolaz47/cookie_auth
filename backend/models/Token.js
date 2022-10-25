import { DataTypes } from "sequelize";
import User from "./User.js";
import sequelize from "../db/conn.js";

const Token = sequelize.define("Token", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

Token.belongsTo(User);
User.hasMany(Token);

export default Token;
