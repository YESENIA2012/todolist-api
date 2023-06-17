import Task from "../models/index.js";

class TasksController {
  getTasks() {
    const allTasks = Task.findAll({ raw: true });

    return allTasks;
  }

  deleteTask(taskId) {
    const taskToDelete = Task.findOne({ where: { id: taskId } });
    Task.destroy({ where: { id: taskId } });

    return taskToDelete;
  }

  newTask({ title, description, state }) {
    const task = Task.create({
      title,
      description,
      state,
    });

    return task;
  }

  async updateTask({ title, description, state }, taskId) {
    const taskUpdate = Task.findOne({ where: { id: taskId } });

    Task.update(
      {
        title: title || Task.title,
        description: description || Task.description,
        state: state || Task.state,
      },
      { where: { id: taskId } }
    );

    return taskUpdate;
  }
}

export default TasksController;
