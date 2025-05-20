import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskModal from './TaskModal';
import { getTasks } from '../data/taskService';
import { getStaff } from '../data/staffService'

const AllTasksPage = () => {
  const [taskList, setTaskList] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  // Fetch tasks on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [taskData, staffData] = await Promise.all([
          getTasks(),
          getStaff()
        ]);
        
        // Map tasks with staff names
        const tasksWithStaffNames = taskData.map(task => ({
          ...task,
          assignedToName: getStaffName(staffData, task.assignedTo)
        }));
        
        setTasks(tasksWithStaffNames);
        setStaffMembers(staffData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const getStaffName = (staffList, staffId) => {
    const staff = staffList.find(s => s.id === staffId);
    return staff ? staff.name : "Unassigned";
  };
  const handleDelete = async (taskId) => {
    // Implement delete logic
    setTaskList(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskUpdated = (updatedTask) => {
    // Update your tasks list state
    setTasks(prev => prev.map(t => 
      t.id === updatedTask.id ? updatedTask : t
    ));
  };

  if (isLoading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Tasks</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.assignedToName}</td>
                  <td className={`status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                  </td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="actions">
                    <button 
                      className="btn btn-sm btn-edit"
                      onClick={() => {
                        setSelectedTaskId(task.id);
                        setShowModal(true);
                      }}
                    >
                      View/Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    {selectedTaskId && (
        <TaskModal 
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default AllTasksPage;