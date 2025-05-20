import React, { useState } from 'react';
import { saveTask } from '../data/taskService';
import { getStaff } from '../data/staffService';
import '../components/css/CreateTaskModal.css';

const CreateTaskModal = ({ currentAdmin, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    assignedTo: '',
    dueDate: ''
  });
  const [staffMembers, setStaffMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load staff members on mount
  useState(() => {
    const loadStaff = async () => {
      const staff = await getStaff();
      setStaffMembers(staff);
      setIsLoading(false);
    };
    loadStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newTask = {
      ...formData,
      assignedBy: currentAdmin.name,
      status: 'Not Started',
      createdAt: new Date().toISOString()
    };

    try {
      await saveTask(newTask);
      onClose();
      // Optionally refresh task list
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create New Task</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className='modal-body'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title*</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Details*</label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              required
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Assign To*</label>
            {isLoading ? (
              <p>Loading staff...</p>
            ) : (
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                required
              >
                <option value="">Select Staff Member</option>
                {staffMembers.map(staff => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Due Date*</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" class="btn btn-default" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" class="btn btn-success"  disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Create Task'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;