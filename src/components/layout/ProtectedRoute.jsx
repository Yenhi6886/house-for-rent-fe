import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../modules/auth/contexts/AuthContext'

const ProtectedRoute = ({ children, requireAuth = true, requireLandlord = false, requireAdmin = false }) => {
  const { user, isAuthenticated, isLandlord, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  const getRedirectPath = () => {
    if (isAdmin()) {
      return '/admin/dashboard'
    }
    if (isLandlord()) {
      return '/landlord/dashboard'
    }
    return '/news-feed'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Case 1: Route is for guests (e.g., /login), but user is already authenticated
  // Redirect them to their respective dashboard.
  if (!requireAuth && isAuthenticated) {
    const redirectPath = getRedirectPath()
    return <Navigate to={redirectPath} replace />
  }

  // Case 2: Route requires authentication, but user is not authenticated
  // Redirect them to the login page.
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Case 3: Route requires landlord role, but user is not a landlord
  // Redirect them to their default dashboard.
  if (requireLandlord && isAuthenticated && !isLandlord()) {
    const redirectPath = getRedirectPath()
    return <Navigate to={redirectPath} replace />
  }

  // Case 4: Route requires admin role, but user is not an admin
  // Redirect them to their default dashboard.
  if (requireAdmin && isAuthenticated && !isAdmin()) {
    const redirectPath = getRedirectPath()
    return <Navigate to={redirectPath} replace />
  }

  // If all checks pass, render the requested component
  return children
}

export default ProtectedRoute