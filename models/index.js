import Sequelize from "sequelize";

const sequelize = new Sequelize("eventio", "eventio", "eventio_pass", {
  host: "localhost",
  dialect: "mariadb",
});

// Prueba de conexión
async function connectToBD() {
  try {
    const dbInstance = await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente");
    return dbInstance;
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

//Modelo de sequelize

const Task = sequelize.define("Task", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
});

export default connectToBD;
