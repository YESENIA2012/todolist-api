import Sequelize from "sequelize";

// Prueba de conexión
async function connectToBD() {
  try {
    const sequelize = new Sequelize("eventio", "eventio", "eventio_pass", {
      host: "localhost",
      dialect: "mariadb",
    });
    const dbInstance = await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente");
    return dbInstance;
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

export default connectToBD;
