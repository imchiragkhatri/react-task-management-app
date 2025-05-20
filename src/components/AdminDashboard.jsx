import { useNavigate } from 'react-router-dom';
import { clearSession, getSession } from '../auth';
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import AssignTaskModal from './AssignTaskModal';
import staff from '../data/staff.json';
import tasks from '../data/tasks.json';
import AddStaffModal from './AddStaffModal';
import CreateTaskModal from './CreateTaskModal';
import { saveStaff } from '../data/staffService'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const currentAdmin = getSession()?.user;
  const handleSaveStaff = async (newStaff) => {
    try {
      const savedStaff = await saveStaff(newStaff);
      // Refresh your staff list state here
      setStaffList(prev => [...prev, savedStaff]);
    } catch (error) {
      console.error("Failed to save staff:", error);
    }
  };
  const handleLogout = () => {
    console.log("Logout");
    clearSession();
    navigate('/login');
    console.log("Redirect");
  };
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setUsers(staff);
    setAllTasks(tasks);
  }, []);

  const getTaskCounts = (userId) => {
    const userTasks = allTasks.filter((task) => task.assignedTo === userId);
    const total = userTasks.length;
    const completed = userTasks.filter((task) => task.status === 'Completed').length;
    const pending = userTasks.filter(
      (task) => task.status === 'Not Started' || task.status === 'In Progress'
    ).length;
    const overdue = userTasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() &&
        task.status !== 'Completed'
    ).length;

    return { total, completed, pending, overdue };
  };

  const handleAssignTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: allTasks.length + 1,
      assignedBy: user.name,
      status: 'Not Started',
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: null,
    };
    setAllTasks([...allTasks, taskWithId]);
    setShowAssignModal(false);
  };

  const handleBlockUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };


  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/tasks')}
          >
            View All Tasks
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateTaskModal(true)}
          >
            Create Task
          </button>
          <button 
            className="btn btn-success"
            onClick={() => setShowAddStaffModal(true)}
          >
            Add Staff
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <UserList
        users={users}
        getTaskCounts={getTaskCounts}
        onBlockUser={handleBlockUser}
        onDeleteUser={handleDeleteUser}
        allTasks={allTasks}
      />

      {showAssignModal && (
        <AssignTaskModal
          users={users}
          onAssign={handleAssignTask}
          onClose={() => setShowAssignModal(false)}
        />
      )}

    {showAddStaffModal && (
        <AddStaffModal  onClose={() => setShowAddStaffModal(false)}
        />
      )}

      {showCreateTaskModal && (
        <CreateTaskModal 
          currentAdmin={currentAdmin}
          onClose={() => setShowCreateTaskModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;