import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

const AdminDashboardPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">Trang quản trị Admin</h1>
        <p className="mt-2 text-gray-600 mb-8">Chào mừng bạn đến với khu vực quản lý hệ thống.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quản lý người dùng</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Xem, khóa hoặc mở khóa tài khoản người dùng.</p>
              <Link to="/admin/users">
                <Button className="w-full">Đi đến trang quản lý</Button>
              </Link>
            </CardContent>
          </Card>
          {/* Thêm các card chức năng khác của Admin tại đây */}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboardPage;