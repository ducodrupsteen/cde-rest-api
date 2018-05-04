import Task from '../../models/tasks'

export default {
  getAllTasks() {
    return Task.find()
      .then(function retrievedTasks(tasksArray) {
        return tasksArray
      })
  }
}
