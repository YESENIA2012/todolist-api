import Task from "../models/index.js";

class TasksController {
  async getTasks() {
    const allTasks = await Task.findAll({ raw: true });
    const parseTask = allTasks.map((task) => task);
    return parseTask;
  }

  async deleteTask(taskId) {
    try {
      const taskToDelete = await Task.findOne({ where: { id: taskId } });
      Task.destroy({ where: { id: taskId } });

      return taskToDelete;
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

      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateTask({ title, description, state }, taskId) {
    try {
      const taskUpdate = await Task.findOne({ where: { id: taskId } });

      Task.update(
        {
          title: title || Task.title,
          description: description || Task.description,
          state: state || Task.state,
        },
        { where: { id: taskId } }
      );

      return taskUpdate;
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default TasksController;
