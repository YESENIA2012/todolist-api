const sequelize = require("./models");
const express = require("express");
const app = express();
const PORT = 3000;

// Sincronizar los modelos con la base de datos

sequelize
  .sync()
  .then(() => {
    console.log("Modelos sincronizados correctamente con la base de datos");
  })
  .catch((error) => {
    console.error(
      "No se pudo sincronizar los modelos con la base de datos:",
      error
    );
  });

// Configuración de middleware para el manejo de datos en formato JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Backend funcionando!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
