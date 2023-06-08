import { Task } from "./models/index.js";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 4000;

// Configuración de middleware para el manejo de datos en formato JSON
app.use(cors());
app.use(express.text());
app.use(express.json());

const validateCreateTaskParams = (title, description, state) => {
  let errorFound = false;
  let invalidProperty = null;

  if (!title) {
    errorFound = true;
    invalidProperty = "title";
  } else if (!description) {
    errorFound = true;
    invalidProperty = "description";
  } else if (!state) {
    errorFound = true;
    invalidProperty = "state";
  }

  return {
    errorFound,
    invalidProperty,
  };
};

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({ raw: true });
    res.status(200).json(tasks);
    console.log("All tasks:", tasks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);
  console.log(taskId);

  const task = await Task.findOne({ where: { id: taskId } });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  Task.destroy({ where: { id: taskId } });
  res.sendStatus(204);
});

app.use((req, res, next) => {
  const { title, description, state } = req.body;
  const validateParams = validateCreateTaskParams(title, description, state);
  if (!validateParams.errorFound) {
    next();
  } else {
    res.status(400).json({
      error: `The ${validateParams.invalidProperty} is required to create the task`,
    });
  }
});

app.post("/tasks", async (req, res) => {
  const { title, description, state } = req.body;

  const newTask = {
    title: title,
    description: description,
    state: state,
  };

  try {
    const createdTask = await Task.create(newTask);
    res.status(201).json(createdTask);
    console.log("Task create:", createdTask);
  } catch (error) {
    res.status(500).json({ error: "error creating task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, state } = req.body;

  const task = await Task.findOne({ where: { id: taskId } });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  Task.update(
    {
      title: title || Task.title,
      description: description || Task.description,
      state: state || Task.state,
    },
    { where: { id: taskId } }
  );

  res.json(Task);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
