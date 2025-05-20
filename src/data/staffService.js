// src/data/staffService.js
import staff from './staff.json'; // Your staff data file

// Initialize with sample data if empty
const initializeStaff = () => {
  if (!localStorage.getItem('staff')) {
    localStorage.setItem('staff', JSON.stringify(staff));
  }
};

// Get all staff members
export const getStaff = async () => {
  initializeStaff();
  return JSON.parse(localStorage.getItem('staff'));
};

// Add new staff member
export const saveStaff = async (newStaff) => {
  const staffData = await getStaff();
  const newStaffWithId = {
    ...newStaff,
    id: staffData.length ? Math.max(...staffData.map(s => s.id)) + 1 : 1,
    isBlocked: false
  };
  
  const updatedStaff = [...staffData, newStaffWithId];
  localStorage.setItem('staff', JSON.stringify(updatedStaff));
  return newStaffWithId;
};

// Update staff member
export const updateStaff = async (id, updates) => {
  const staffData = await getStaff();
  const updatedStaff = staffData.map(staff => 
    staff.id === id ? { ...staff, ...updates } : staff
  );
  localStorage.setItem('staff', JSON.stringify(updatedStaff));
  return updatedStaff.find(staff => staff.id === id);
};

// Delete staff member
export const deleteStaff = async (id) => {
  const staffData = await getStaff();
  const updatedStaff = staffData.filter(staff => staff.id !== id);
  localStorage.setItem('staff', JSON.stringify(updatedStaff));
};
