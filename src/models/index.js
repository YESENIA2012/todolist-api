import Sequelize from "sequelize";

const sequelize = new Sequelize("eventio", "eventio", "eventio_pass", {
  host: "localhost",
  dialect: "mariadb",
});

//Modelo de sequelize
const Task = sequelize.define(
  "Task",
  {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "tasks",
    createdAt: false,
    updatedAt: false,
  }
);

export default Task;
