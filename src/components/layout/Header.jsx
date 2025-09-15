import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuth } from '../../modules/auth/contexts/AuthContext'
import { getDefaultAvatar } from '../../shared/utils'
import toast from 'react-hot-toast'

const Header = () => {
  const { user, isAuthenticated, logout, isLandlord } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    toast.success('Đăng xuất thành công!')
    navigate('/login')
  }

  const isActivePath = (path) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-sm border-b dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">HouseRent</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/news-feed"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath('/news-feed')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              Trang chủ
            </Link>
            
            <Link
              to="/housing"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath('/housing')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              Tìm nhà trọ
            </Link>

            {isAuthenticated && user && isLandlord() && (
              <Link
                to="/landlord/properties"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath('/landlord/properties')
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                Quản lý nhà trọ
              </Link>
            )}

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath('/contact')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              Liên hệ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar || getDefaultAvatar(user.fullName || user.username)}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.fullName || user.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isLandlord() ? 'Chủ nhà' : 'Người thuê'}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/profile')}
                  >
                    Thông tin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/news-feed"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActivePath('/news-feed')
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            Trang chủ
          </Link>
          
          <Link
            to="/housing"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActivePath('/housing')
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            Tìm nhà trọ
          </Link>

          {isAuthenticated && user && isLandlord() && (
            <Link
              to="/landlord/properties"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath('/landlord/properties')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              Quản lý nhà trọ
            </Link>
          )}

          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActivePath('/contact')
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            Liên hệ
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header