import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { useAuth } from '../../auth/contexts/AuthContext'
import profileService from '../services/profileService'

const ProfileForm = () => {
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    mode: 'onBlur'
  })

  useEffect(() => {
    if (user) {
      const defaultValues = {
        username: user.username,
        fullName: user.fullName || '',
        address: user.address || '',
        phone: user.phone || ''
      }
      reset(defaultValues)
      setAvatarPreview(user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`)
    }
  }, [user, reset])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn một file ảnh.')
        return
      }
      if (file.size > 5 * 1024 * 1024) { 
        toast.error('Kích thước ảnh không được vượt quá 5MB.')
        return
      }
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      let avatarUrl = user.avatar
      if (avatarFile) {
        const uploadResult = await profileService.uploadAvatar(avatarFile)
        avatarUrl = uploadResult
      }
      
      const profileData = {
        fullName: data.fullName,
        address: data.address,
        phone: data.phone,
        avatar: avatarUrl
      }

      await profileService.updateProfile(profileData)
      updateProfile(profileData)
      toast.success('Cập nhật thông tin thành công!')
    } catch (error) {
      toast.error(error.message || 'Cập nhật thất bại. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>Cập nhật thông tin chi tiết của bạn.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
            />
            <Button as="label" variant="outline" className="cursor-pointer">
              Thay đổi ảnh
              <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
            </Button>
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" {...register('username')} disabled className="bg-gray-100 dark:bg-gray-700" />
            <p className="text-sm text-gray-500 mt-1">Username không thể thay đổi.</p>
          </div>

          <div>
            <Label htmlFor="fullName">Họ và tên (*)</Label>
            <Input
              id="fullName"
              type="text"
              {...register('fullName', {
                required: 'Họ và tên không được để trống',
                pattern: {
                  value: /^[a-zA-ZÀ-ỹ\s]*$/,
                  message: 'Họ tên chỉ chứa chữ cái và khoảng trắng'
                }
              })}
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input id="address" type="text" {...register('address')} />
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
                  message: 'Số điện thoại không hợp lệ'
                }
              })}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileForm