import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getSession } from './auth';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import AllTasksPage from './components/AllTasksPage';
import './App.css';
import { useEffect } from 'react';

function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true });
    }
  }, [session, navigate]);

  return session ? children : null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <AuthWrapper>
              <AdminDashboard />
            </AuthWrapper>  
          } 
        />
        <Route 
          path="/tasks" 
          element={<AuthWrapper>
             <AllTasksPage />
          </AuthWrapper> } 
        />
        <Route 
          path="/staff-dashboard" 
          element={
            <AuthWrapper>
              <StaffDashboard />
            </AuthWrapper>
          }
        />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;