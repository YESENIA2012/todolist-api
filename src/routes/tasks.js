import { Router } from "express";
import TasksController from "../controllers/tasksControllers.js";
import { validateData } from "./validators.js";

const router = Router();
const tasksController = new TasksController();

router.get("/tasks", async (_, res) => {
  try {
    const tasks = await tasksController.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks" });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    const taskToDelete = await tasksController.deleteTask(taskId);

    if (!taskToDelete) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error deleting tasks" });
  }
});

router.post("/tasks", validateData, async (req, res) => {
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
    res.status(500).json({ error: "error creating task" });
  }
});

router.put("/tasks/:id", async (req, res) => {
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
    res.status(500).json({ error: "error updating task" });
  }
});

export default router;
