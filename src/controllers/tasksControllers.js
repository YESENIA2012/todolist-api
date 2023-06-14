import Task from "../models/index.js";

class TasksController {
  async getTasks() {
    const allTasks = await Task.findAll({ raw: true });
    const parseTask = allTasks.map((task) => task);
    return parseTask;
  }

  async newTask({ title, description, state }) {
    try {
      const task = await Task.create({
        title,
        description,
        state,
      });
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default TasksController;
