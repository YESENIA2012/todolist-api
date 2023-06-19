import Sequelize from "sequelize";
import config from "./config/index.js";
let sequelize = null;

const getInstance = () => {
  try {
    const { ENVIROMENT } = process.env;

    if (sequelize) {
      console.log("returning instace already found..");
      return sequelize;
    }

    console.log("initializing a new connection instance");
    sequelize = new Sequelize(config[ENVIROMENT]);
    return sequelize;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export { getInstance };
