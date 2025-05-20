import tasks from './tasks.json'; // Your JSON data

const initializeTasks = () => {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

export const getTasks = () => {
  return Promise.resolve(tasks); // Simulate async API call
};

export const getTaskById = (id) => {
  return tasks.find(task => task.id === id);
};

export const saveTask = async (newTask) => {
    initializeTasks();
    const taskData = JSON.parse(localStorage.getItem('tasks'));

    const taskWithId = {
        ...newTask,
        id: taskData.length ? Math.max(...taskData.map(t => t.id)) + 1 : 1
    };

    const updatedTasks = [...taskData, taskWithId];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return taskWithId;
};


export const updateTask = async (taskId, updates) => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, ...updates } : task
  );  
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  return updatedTasks.find(task => task.id === taskId);
};

