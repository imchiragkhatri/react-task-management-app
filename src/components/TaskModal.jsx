import React, { useState } from 'react';

const TaskModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    details: task.details,
    assignedTo: task.assignedTo,
    status: task.status
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal-content">
        <div className="modal-header">
          <h3>Edit Task</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}>
          {/* Form fields similar to AssignTaskModal */}
          <div className="form-group">
            <label>Assigned To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="form-input"
            >
              {staffMembers.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;