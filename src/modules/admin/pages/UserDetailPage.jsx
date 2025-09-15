import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  FiUser, 
  FiPhone, 
  FiDollarSign, 
  FiHome, 
  FiMail,
  FiActivity
} from 'react-icons/fi';
import MainLayout from '../../../components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Separator } from '../../../components/ui/separator';
import { 
  UserAvatar, 
  UserInfoCard, 
  StatusBadge, 
  BackButton, 
  PageHeader, 
  EmptyState, 
  LoadingSpinner,
  StatCard,
  InfoSection 
} from '../../../components/common';
import adminService from '../services/adminService';

const UserDetailPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const data = await adminService.getUserDetails(userId);
        setUser(data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        toast.error('Không thể tải thông tin người dùng.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner 
          size="lg" 
          text="Đang tải chi tiết người dùng..." 
          className="min-h-screen"
        />
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8">
          <EmptyState
            title="Không tìm thấy người dùng"
            description="Người dùng không tồn tại hoặc đã bị xóa."
            action={
              <BackButton 
                to="/admin/users"
                children="Quay lại danh sách"
              />
            }
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        {/* Header */}
        <PageHeader
          title="Chi tiết người dùng"
          subtitle="Thông tin chi tiết và hoạt động của người dùng"
          leftContent={
            <BackButton 
              to="/admin/users"
              children="Quay lại danh sách"
            />
          }
        />

        {/* User Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Avatar and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center space-y-4">
                  <UserAvatar
                    src={user.avatar}
                    username={user.username}
                    fullName={user.fullName}
                    size="xl"
                    className="shadow-lg ring-4 ring-white"
                  />
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user.fullName || user.username}
                    </h2>
                    <p className="text-sm text-gray-500 font-mono">@{user.username}</p>
                    <StatusBadge status={user.accountNonLocked} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <UserInfoCard
                label="Số điện thoại"
                value={user.phone || "Chưa cập nhật"}
                icon={FiPhone}
              />
              <UserInfoCard
                label="Email"
                value={user.email || "Chưa cập nhật"}
                icon={FiMail}
              />
              <StatCard
                title="Tổng chi tiêu"
                value={new Intl.NumberFormat('vi-VN', { 
                  style: 'currency', 
                  currency: 'VND' 
                }).format(user.totalSpent || 0)}
                icon={FiDollarSign}
                color="purple"
                subtitle="Tổng số tiền đã thanh toán"
                className="md:col-span-2 lg:col-span-1"
              />
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <FiUser className="h-4 w-4" />
              <span>Tổng quan</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <FiActivity className="h-4 w-4" />
              <span>Hoạt động</span>
            </TabsTrigger>
            <TabsTrigger value="rental" className="flex items-center space-x-2">
              <FiHome className="h-4 w-4" />
              <span>Lịch sử thuê</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InfoSection
                title="Thông tin cá nhân"
                icon={FiUser}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Tên đăng nhập</h4>
                      <p className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                        {user.username}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Họ và tên</h4>
                      <p>{user.fullName || "Chưa cập nhật"}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Số điện thoại</h4>
                      <p>{user.phone || "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Email</h4>
                      <p>{user.email || "Chưa cập nhật"}</p>
                    </div>
                  </div>
                </div>
              </InfoSection>

              <InfoSection
                title="Thông tin tài chính"
                icon={FiDollarSign}
              >
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      Tổng số tiền đã chi tiêu
                    </h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {new Intl.NumberFormat('vi-VN', { 
                        style: 'currency', 
                        currency: 'VND' 
                      }).format(user.totalSpent || 0)}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-500">Trạng thái tài khoản</h4>
                    <StatusBadge status={user.accountNonLocked} />
                  </div>
                </div>
              </InfoSection>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <InfoSection
              title="Lịch sử hoạt động"
              icon={FiActivity}
            >
              <EmptyState
                icon={FiActivity}
                title="Chưa có dữ liệu hoạt động"
                description="Lịch sử hoạt động của người dùng sẽ hiển thị tại đây"
              />
            </InfoSection>
          </TabsContent>

          <TabsContent value="rental" className="mt-6">
            <InfoSection
              title="Lịch sử thuê nhà"
              icon={FiHome}
            >
              <EmptyState
                icon={FiHome}
                title="Chưa có lịch sử thuê nhà"
                description="Thông tin các căn nhà đã thuê sẽ hiển thị tại đây"
              />
            </InfoSection>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserDetailPage;