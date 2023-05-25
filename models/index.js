const Sequelize = require("sequelize");
const sequelize = new Sequelize("eventio", "eventio", "eventio_pass", {
  host: "localhost",
  dialect: "mysql",
});

// Prueba de conexión
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");
  })
  .catch((error) => {
    console.error("No se pudo conectar a la base de datos:", error);
  });

module.exports = sequelize;
