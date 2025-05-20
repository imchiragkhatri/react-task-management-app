import React from 'react';
import '../components/css/EditTaskModal.css';
const TaskListModal = ({ user, tasks, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Tasks Assigned to {user.name}</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="task-list-container">
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td className={`status-${task.status.toLowerCase()}`}>
                      {task.status}
                    </td>
                    <td>{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskListModal;