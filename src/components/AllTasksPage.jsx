import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskModal from './TaskModal';
import tasks from '../data/tasks.json';

const AllTasksPage = () => {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch tasks on component mount
  useEffect(() => {
    setTaskList(tasks);
    setIsLoading(false);
  }, []);

  const handleDelete = async (taskId) => {
    // Implement delete logic
    setTaskList(tasks.filter(task => task.id !== taskId));
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
                  <td>{task.assignedToName || "Unassigned"}</td>
                  <td className={`status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                  </td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="actions">
                    <button 
                      className="btn btn-sm btn-edit"
                      onClick={() => {
                        setSelectedTask(task);
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

      {showModal && selectedTask && (
        <TaskModal 
          task={selectedTask}
          onClose={() => setShowModal(false)}
          onSave={(updatedTask) => {
            setTasks(tasks.map(t => 
              t.id === updatedTask.id ? updatedTask : t
            ));
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AllTasksPage;