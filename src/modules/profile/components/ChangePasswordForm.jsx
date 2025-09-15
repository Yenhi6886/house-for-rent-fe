import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import profileService from '../services/profileService'

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    mode: 'onBlur'
  })

  const newPassword = watch('newPassword')
  const currentPassword = watch('currentPassword')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const passwordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmPassword
      }
      await profileService.changePassword(passwordData)
      toast.success('Thay đổi mật khẩu thành công!')
      reset()
    } catch (error) {
      toast.error(error.message || 'Thay đổi mật khẩu thất bại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thay đổi mật khẩu</CardTitle>
        <CardDescription>Để bảo mật, không chia sẻ mật khẩu của bạn cho bất kỳ ai.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Mật khẩu hiện tại (*)</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register('currentPassword', { required: 'Mật khẩu hiện tại không được để trống' })}
              className={errors.currentPassword ? 'border-red-500' : ''}
            />
            {errors.currentPassword && <p className="text-sm text-red-500 mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <Label htmlFor="newPassword">Mật khẩu mới (*)</Label>
            <Input
              id="newPassword"
              type="password"
              {...register('newPassword', {
                required: 'Mật khẩu mới không được để trống',
                minLength: { value: 6, message: 'Mật khẩu phải từ 6-8 ký tự' },
                maxLength: { value: 8, message: 'Mật khẩu phải từ 6-8 ký tự' },
                validate: value => value !== currentPassword || 'Mật khẩu mới không được trùng với mật khẩu cũ.'
              })}
              className={errors.newPassword ? 'border-red-500' : ''}
            />
            {errors.newPassword && <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Nhập lại mật khẩu (*)</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Vui lòng xác nhận mật khẩu mới',
                validate: value => value === newPassword || 'Mật khẩu xác nhận không khớp.'
              })}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu mật khẩu'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordForm