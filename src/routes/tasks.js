import { Router } from "express";
import TasksController from "../controllers/tasksControllers.js";
import { validateData } from "./validators.js";

const router = Router();
const tasksController = new TasksController();

router.get("/tasks", async (_, res, next) => {
  try {
    const tasks = await tasksController.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.delete("/tasks/:id", async (req, res, next) => {
  const taskId = parseInt(req.params.id);

  try {
    const taskToDelete = await tasksController.deleteTask(taskId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post("/tasks", validateData, async (req, res, next) => {
  // el va a saber que el segundo parametro es un middlware
  const { title, description, state } = req.body;

  try {
    const newTask = await tasksController.newTask({
      title,
      description,
      state,
    });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put("/tasks/:id", validateData, async (req, res, next) => {
  const taskId = parseInt(req.params.id);
  const { title, description, state } = req.body;

  try {
    const taskUpdate = await tasksController.updateTask(
      { title, description, state },
      taskId,
      res
    );

    if (!taskUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(taskUpdate);
  } catch (error) {
    next(error);
  }
});

export default router;
