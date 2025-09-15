import { useAuth } from '../../modules/auth/contexts/AuthContext'

// Custom hook để check authentication và role
export const useAuthCheck = () => {
  const { isAuthenticated, user, isLandlord, isTenant } = useAuth()

  return {
    isAuthenticated,
    user,
    isLandlord: isLandlord(),
    isTenant: isTenant(),
    userRole: user?.role
  }
}

export default useAuthCheck
