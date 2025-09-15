import React from 'react';
import MainLayout from '../../../components/layout/MainLayout';

const LandlordDashboardPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">Dashboard của Chủ nhà</h1>
        <p className="mt-2 text-gray-600">Chào mừng bạn đến với khu vực quản lý dành cho chủ nhà.</p>
        {/* Thêm các component quản lý của chủ nhà tại đây */}
      </div>
    </MainLayout>
  );
};

export default LandlordDashboardPage;