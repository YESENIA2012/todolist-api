import connectToBD from "./models/index.js";
import express from "express";
const app = express();
const PORT = 4000;

// Sincronizar los modelos con la base de datos
await connectToBD();

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
