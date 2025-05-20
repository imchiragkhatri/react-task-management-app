import React, { useState, useEffect } from 'react';
import { updateTask, getTaskById } from '../data/taskService';
import { getStaff } from '../data/staffService';

const TaskModal = ({ taskId, onClose, onTaskUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    assignedTo: '',
    dueDate: '',
    status: ''
  });
  const [staffMembers, setStaffMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load task and staff data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [task, staff] = await Promise.all([
          getTaskById(taskId),
          getStaff()
        ]);
        
        setFormData({
          title: task.title,
          details: task.details,
          assignedTo: task.assignedTo,
          dueDate: task.dueDate.split('T')[0],
          status: task.status
        });
        
        setStaffMembers(staff);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const updatedTask = await updateTask(taskId, {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      });
      
      onTaskUpdated(updatedTask);
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="loading">Loading task details...</div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>View/Edit Task</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div class="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Details</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                required
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Assigned To</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                required
              >
                {staffMembers.map(staff => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                required
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? 'Updating...' : 'Update Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;