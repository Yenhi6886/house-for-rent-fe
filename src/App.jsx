import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './modules/auth/contexts/AuthContext'
import ProtectedRoute from './components/layout/ProtectedRoute'

// Auth Pages
import LoginPage from './modules/auth/pages/LoginPage'
import RegisterPage from './modules/auth/pages/RegisterPage'
import RegisterLandlordPage from './modules/auth/pages/RegisterLandlordPage'

// Main Pages
import NewsFeedPage from './modules/housing/pages/NewsFeedPage'
import HousingListPage from './modules/housing/pages/HousingListPage'
import ProfilePage from './modules/profile/pages/ProfilePage'

// Landlord Pages
import LandlordDashboardPage from './modules/landlord/pages/DashboardPage'

// Admin Pages
import AdminDashboardPage from './modules/admin/pages/DashboardPage'
import UserListPage from './modules/admin/pages/UserListPage'
import UserDetailPage from './modules/admin/pages/UserDetailPage'
import HostListPage from './modules/admin/pages/HostListPage'

import './globals.css'

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<ProtectedRoute requireAuth={false}><LoginPage /></ProtectedRoute>} />
              <Route path="/register" element={<ProtectedRoute requireAuth={false}><RegisterPage /></ProtectedRoute>} />
              <Route path="/register-landlord" element={<ProtectedRoute requireAuth={false}><RegisterLandlordPage /></ProtectedRoute>} />

              {/* User Routes */}
              <Route path="/news-feed" element={<ProtectedRoute><NewsFeedPage /></ProtectedRoute>} />
              <Route path="/housing" element={<ProtectedRoute><HousingListPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {/* Landlord Routes */}
              <Route path="/landlord/dashboard" element={<ProtectedRoute requireLandlord={true}><LandlordDashboardPage /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin={true}><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin={true}><UserListPage /></ProtectedRoute>} />
              <Route path="/admin/users/:userId" element={<ProtectedRoute requireAdmin={true}><UserDetailPage /></ProtectedRoute>} />
              <Route path="/admin/hosts" element={<ProtectedRoute requireAdmin={true}><HostListPage /></ProtectedRoute>} />


              {/* Default & Fallback Routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/news-feed" replace />} />
            </Routes>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          </div>
        </Router>
      </AuthProvider>
  )
}

export default App