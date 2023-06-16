import Task from "../models/index.js";

class TasksController {
  async getTasks() {
    const allTasks = await Task.findAll({ raw: true });
    const parseTask = allTasks.map((task) => task);
    return parseTask;
  }

  async deleteTask(taskId, res) {
    try {
      const taskToDelete = await Task.findOne({ where: { id: taskId } });

      if (!taskToDelete) {
        return res.status(404).json({ error: "Task not found" });
      }

      Task.destroy({ where: { id: taskId } });
      res.sendStatus(204);
    } catch (error) {
      console.log("error", error);
    }
  }

  async newTask({ title, description, state }) {
    try {
      const task = await Task.create({
        title,
        description,
        state,
      });
      console.log("Task create:", task);
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateTask({ title, description, state }, taskId, res) {
    try {
      const taskUpdate = await Task.findOne({ where: { id: taskId } });
      if (!taskUpdate) {
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

      res.json(taskUpdate);
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default TasksController;
