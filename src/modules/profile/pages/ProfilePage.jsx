import React from 'react'
import MainLayout from '../../../components/layout/MainLayout'
import ProfileForm from '../components/ProfileForm'
import ChangePasswordForm from '../components/ChangePasswordForm'

const ProfilePage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Thông tin tài khoản</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân và bảo mật</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProfileForm />
          <ChangePasswordForm />
        </div>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
