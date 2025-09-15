import React from 'react'
import { useAuth } from '../../auth/contexts/AuthContext'
import MainLayout from '../../../components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Link } from 'react-router-dom'

const NewsFeedPage = () => {
  const { user, isLandlord } = useAuth()

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chào mừng, {user?.fullName || user?.username}!
          </h1>
          <p className="text-gray-600">
            {isLandlord() 
              ? 'Quản lý các căn hộ của bạn và tìm người thuê phù hợp' 
              : 'Tìm kiếm căn hộ hoàn hảo cho bạn'
            }
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tìm nhà trọ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Khám phá hàng nghìn căn hộ cho thuê
              </p>
              <Link to="/housing">
                <Button className="w-full">Tìm kiếm</Button>
              </Link>
            </CardContent>
          </Card>

          {isLandlord() && (
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Đăng tin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Đăng tin cho thuê nhà trọ của bạn
                </p>
                <Link to="/landlord/create-property">
                  <Button className="w-full">Đăng tin</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Cập nhật thông tin tài khoản
              </p>
              <Link to="/profile">
                <Button variant="outline" className="w-full">Chỉnh sửa</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Liên hệ với chúng tôi khi cần hỗ trợ
              </p>
              <Link to="/contact">
                <Button variant="outline" className="w-full">Liên hệ</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities or Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Đăng nhập lần cuối</p>
                    <p className="text-xs text-gray-500">Hôm nay, 10:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Cập nhật thông tin</p>
                    <p className="text-xs text-gray-500">2 ngày trước</p>
                  </div>
                </div>

                {isLandlord() && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Đăng tin mới</p>
                      <p className="text-xs text-gray-500">1 tuần trước</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLandlord() ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng tin đăng:</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đang cho thuê:</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lượt xem:</span>
                      <span className="font-semibold">0</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nhà yêu thích:</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đã xem:</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Liên hệ:</span>
                      <span className="font-semibold">0</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export default NewsFeedPage
