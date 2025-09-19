import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { useAuth } from '../contexts/AuthContext'
import authService from '../services/authService'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: 'onBlur'
  })

  useEffect(() => {
    if (location.state?.username) {
      setValue('username', location.state.username)
    }
    if (location.state?.password) {
      setValue('password', location.state.password)
    }
  }, [location.state, setValue])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const result = await authService.login({
        username: data.username,
        password: data.password
      })
      toast.success('Đăng nhập thành công!')
      login(result.userInfo, result.token)

      switch (result.userInfo.role) {
        case 'ADMIN':
          navigate('/admin/dashboard')
          break
        case 'HOST':
          navigate('/landlord/dashboard')
          break
        case 'USER':
        default:
          navigate('/news-feed')
          break
      }
    } catch (error) {
      toast.error(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    toast.info('Tính năng đang được phát triển!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CEF2F8] to-[#E0F7FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <div className="w-10 h-10 bg-[#CEF2F8] rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-blue-600">H</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">HouseRent</h1>
          <p className="text-gray-600">Nền tảng thuê nhà trọ uy tín</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800">Chào mừng trở lại!</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Đăng nhập để tiếp tục sử dụng dịch vụ
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 mb-2 block">
                  Tên đăng nhập
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập của bạn"
                    {...register('username', { 
                      required: 'Username không được để trống',
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Username không hợp lệ và không được chứa ký tự đặc biệt"
                      }
                    })}
                    className={`pl-4 pr-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 ${errors.username ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200 hover:border-gray-300'}`}
                  />
                  {errors.username && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    {...register('password', { 
                      required: 'Mật khẩu không được để trống' 
                    })}
                    className={`pl-4 pr-4 py-3 border-2 rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200 hover:border-gray-300'}`}
                  />
                  {errors.password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang đăng nhập...
                    </div>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">
                  Hoặc tiếp tục với
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full py-3 px-4 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                onClick={handleGoogleLogin} 
                disabled={isLoading}
              >
                <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.548,44,30.852,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Đăng nhập với Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Đăng ký ngay
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Bạn là chủ nhà?{' '}
                <Link
                  to="/register-landlord"
                  className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
                >
                  Đăng ký làm chủ nhà
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm