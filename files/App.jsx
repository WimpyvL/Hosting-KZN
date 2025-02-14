import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AgentDashboard from './components/AgentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomePage from './components/HomePage';
import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import CommissionTracking from './components/CommissionTracking';
import ClientRegister from './components/ClientRegister';
import AdminLogin from './components/AdminLogin';
import ClientDashboard from './components/ClientDashboard';
import AdminRegister from './components/AdminRegister';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/client-register" element={<ClientRegister />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-register" element={<AdminRegister />} />

              {/* Agent Routes */}
              <Route
                path="/agent-dashboard"
                element={
                  <PrivateRoute>
                    <AgentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/commission-tracking"
                element={
                  <PrivateRoute>
                    <CommissionTracking />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
               {/* Client Routes */}
               <Route
                path="/client-dashboard"
                element={
                  <PrivateRoute>
                    <ClientDashboard />
                  </PrivateRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Box>
        </Box>
      </AuthProvider>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);

export default App;
