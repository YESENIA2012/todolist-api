import { DataTypes } from "sequelize";
import { getInstance } from "../../dbs/setup.js";
const sequelize = getInstance();

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const Task = sequelize.define("task", schema, {
  tableName: "tasks",
  createdAt: false,
  updatedAt: false,
});

export default Task;
