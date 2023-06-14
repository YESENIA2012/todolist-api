import { Router } from "express";
import TasksController from "../controllers/tasksControllers.js";
/* import TasksController from "./src/controllers/tasksControllers.js"; */
import { validateData } from "./validators.js";

const router = Router();
const tasksController = new TasksController();

console.log("esta entrando a las rutas");

router.get("/tasks", async (_, res, next) => {
  try {
    const tasks = await tasksController.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks" });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);
  console.log(taskId);

  const task = await Task.findOne({ where: { id: taskId } });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  Task.destroy({ where: { id: taskId } });
  res.sendStatus(204);
});

validateData(router);

router.post("/tasks", async (req, res) => {
  const { title, description, state } = req.body;

  try {
    const createdTask = await tasksController.newTask({
      title,
      description,
      state,
    });
    res.status(201).json(createdTask);
    console.log("Task create:", createdTask);
  } catch (error) {
    res.status(500).json({ error: "error creating task" });
  }
});

router.put("/tasks/:id", async (req, res) => {
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

export default router;
