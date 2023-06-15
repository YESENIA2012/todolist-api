/* import Sequelize from "sequelize"; */
import { DataTypes } from "sequelize";
import { getInstance } from "../../dbs/setup.js";
const sequelize = getInstance();

const schema = {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
};

const Task = sequelize.define("task", schema, {
  tableName: "tasks",
  createdAt: false,
  updatedAt: false,
});

export default Task;
