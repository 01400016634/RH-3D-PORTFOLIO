import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

import { PortfolioProvider } from './contexts/PortfolioContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Auth Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;