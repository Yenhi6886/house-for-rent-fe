import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import authService from '../services/authService'

const RegisterForm = ({ isLandlord = false }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onBlur' 
  })

  const password = watch('password')

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      const userData = {
        username: data.username,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: isLandlord ? 'landlord' : 'tenant'
      }

      if (isLandlord) {
        await authService.registerLandlord(userData)
      } else {
        await authService.register(userData)
      }
      
      toast.success('Đăng ký thành công!')
      
      navigate('/login', { 
        state: { 
          username: data.username,
          password: data.password
        }
      })
      
    } catch (error) {
      toast.error(error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isLandlord ? 'Đăng ký làm chủ nhà' : 'Đăng ký tài khoản'}
            </CardTitle>
            <CardDescription>
              {isLandlord 
                ? 'Tạo tài khoản chủ nhà để đăng tin cho thuê'
                : 'Tạo tài khoản mới để bắt đầu tìm nhà trọ'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="username">Username (*)</Label>
                <Input
                  id="username"
                  type="text"
                  {...register('username', { 
                    required: 'Username không được để trống',
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username chỉ chứa chữ cái, số và dấu gạch dưới"
                    } 
                  })}
                  className={errors.username ? 'border-red-500' : ''}
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại (*)</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone', { 
                    required: 'Số điện thoại không được để trống',
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ"
                    }
                  })}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Mật khẩu (*)</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', { 
                    required: 'Mật khẩu không được để trống',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    },
                    maxLength: {
                      value: 32,
                      message: 'Mật khẩu không được vượt quá 32 ký tự'
                    }
                  })}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu (*)</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', { 
                    required: 'Vui lòng xác nhận mật khẩu',
                    validate: value =>
                      value === password || "Mật khẩu xác nhận không khớp"
                  })}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : (isLandlord ? 'Đăng ký làm chủ nhà' : 'Đăng ký')}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đã có tài khoản?{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Đăng nhập ngay
                </Link>
              </p>

              {!isLandlord ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bạn là chủ nhà?{' '}
                  <Link
                    to="/register-landlord"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Đăng ký tại đây
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bạn là người thuê?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Đăng ký tại đây
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RegisterForm