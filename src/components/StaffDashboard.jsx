import React, { useState, useEffect } from 'react';
import TaskDetailModal from './TaskDetailModal';
import tasks from '../data/tasks.json';

const StaffDashboard = ({ user, onLogout }) => {
  const [userTasks, setUserTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    // Filter tasks assigned to the current staff member
    const filteredTasks = tasks.filter((task) => task.assignedTo === user.id);
    setUserTasks(filteredTasks);
  }, [user.id]);

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = userTasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'Completed' ? new Date().toISOString().split('T')[0] : null,
        };
      }
      return task;
    });
    setUserTasks(updatedTasks);
  };

  const openTaskDetail = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  return (
    <div className="staff-dashboard">
      <header className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="tasks-container">
        <h3>Your Tasks</h3>
        {userTasks.length === 0 ? (
          <p>No tasks assigned to you.</p>
        ) : (
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Status</th>
                <th>Assigned By</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userTasks.map((task) => (
                <tr key={task.id} className={task.status.toLowerCase().replace(' ', '-')}>
                  <td>
                    <button
                      className="task-link"
                      onClick={() => openTaskDetail(task)}
                    >
                      {task.title}
                    </button>
                  </td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className={`status-select ${task.status.toLowerCase().replace(' ', '-')}`}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>{task.assignedBy}</td>
                  <td className={new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? 'overdue' : ''}>
                    {task.dueDate}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openTaskDetail(task)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showTaskModal && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setShowTaskModal(false)}
        />
      )}
    </div>
  );
};

export default StaffDashboard;