import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignTaskModal = ({ users, onAssign, onClose }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({ title, details, assignedTo, dueDate });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal-content">
        <div className="modal-header">
          <h3>Assign New Task</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Task Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className="form-input"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select Staff Member</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              className="form-input"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskModal;