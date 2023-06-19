import "./dotenv.js";
import router from "./src/routes/tasks.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// Configuración de middleware para el manejo de datos en formato JSON
app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  if (err?.original) {
    console.log("error middleware ", err.original);
  } else {
    console.log("error middleware ", err);
  }
  res.status(500).json({ error: "Internal Server Error" });
  next();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
