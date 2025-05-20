import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskListModal from './TaskListModal';
const UserList = ({ users, getTaskCounts, onBlockUser, onDeleteUser, allTasks }) => {
 // const navigate = useNavigate();
 const [selectedUser, setSelectedUser] = useState(null);
 const [showTasksModal, setShowTasksModal] = useState(false);
 const [taskType, setTaskType] = useState('all');
  const viewTasks = (userId, filter) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setTaskType(filter);
    // Option 1: Show modal
    setShowTasksModal(true);
  };

  const filteredTasks = (userId, filter) => {
    let tasks = allTasks.filter(task => task.assignedTo === userId);
    
    if (filter === 'completed') tasks = tasks.filter(t => t.status === 'Completed');
    if (filter === 'pending') tasks = tasks.filter(t => t.status !== 'Completed');
    if (filter === 'overdue') {
      tasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed');
    }
    
    return tasks;
  };

  return (
    <div className="user-list-container">
      <h3>Staff Members</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Tasks</th>
            <th>Completed</th>
            <th>Pending</th>
            <th>Overdue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const counts = getTaskCounts(user.id);
            return (
              <tr key={user.id} className={user.isBlocked ? 'blocked' : ''}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="task-count-link"
                    onClick={() => viewTasks(user.id, 'all')}
                  >
                    {counts.total}
                  </button>
                </td>
                <td>
                  <button
                    className="task-count-link"
                    onClick={() => viewTasks(user.id, 'completed')}
                  >
                    {counts.completed}
                  </button>
                </td>
                <td>
                  <button
                    className="task-count-link"
                    onClick={() => viewTasks(user.id, 'pending')}
                  >
                    {counts.pending}
                  </button>
                </td>
                <td>
                  <button
                    className="task-count-link"
                    onClick={() => viewTasks(user.id, 'overdue')}
                  >
                    {counts.overdue}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => onBlockUser(user.id)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showTasksModal && selectedUser && (
        <TaskListModal
          user={selectedUser}
          tasks={filteredTasks(selectedUser.id, taskType)}
          onClose={() => setShowTasksModal(false)}
        />
      )}
    </div>
  );
};

export default UserList;