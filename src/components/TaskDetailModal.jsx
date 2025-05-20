import React from 'react';

const TaskDetailModal = ({ task, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Task Details</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="task-details">
          <div className="detail-row">
            <strong>Title:</strong>
            <span>{task.title}</span>
          </div>
          <div className="detail-row">
            <strong>Details:</strong>
            <p>{task.details}</p>
          </div>
          <div className="detail-row">
            <strong>Assigned By:</strong>
            <span>{task.assignedBy}</span>
          </div>
          <div className="detail-row">
            <strong>Due Date:</strong>
            <span>{task.dueDate}</span>
          </div>
          <div className="detail-row">
            <strong>Status:</strong>
            <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </div>
          {task.completedAt && (
            <div className="detail-row">
              <strong>Completed On:</strong>
              <span>{task.completedAt}</span>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;