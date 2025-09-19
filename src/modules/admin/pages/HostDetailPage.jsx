import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import MainLayout from '../../../components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import adminService from '../services/adminService';

const HostDetailPage = () => {
    const { hostId } = useParams();
    const [host, setHost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHostDetails = async () => {
            setIsLoading(true);
            try {
                const data = await adminService.getHostDetails(hostId);
                setHost(data);
            } catch (error) {
                toast.error('Không thể tải thông tin chủ nhà.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchHostDetails();
    }, [hostId]);

    if (isLoading) {
        return <MainLayout><p className="text-center py-10">Đang tải chi tiết chủ nhà...</p></MainLayout>;
    }

    if (!host) {
        return <MainLayout><p className="text-center py-10">Không tìm thấy chủ nhà.</p></MainLayout>;
    }

    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                <Link to="/admin/hosts" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Quay lại danh sách</Link>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Card>
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                                <img
                                    src={host.avatar || `https://ui-avatars.com/api/?name=${host.username}&background=random`}
                                    alt="Avatar"
                                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
                                />
                                <h2 className="text-2xl font-bold">{host.fullName || host.username}</h2>
                                <p className="text-gray-500 dark:text-gray-400">@{host.username}</p>
                                <Badge className="mt-4">{host.status}</Badge>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông tin chi tiết</CardTitle>
                                <CardDescription>Thông tin liên hệ và thống kê của chủ nhà.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-500">Số điện thoại</h4>
                                        <p>{host.phone}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-500">Email</h4>
                                        <p>{host.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Địa chỉ</h4>
                                    <p>{host.address || 'Chưa cập nhật'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Tổng doanh thu</h4>
                                    <p className="text-xl font-semibold text-green-600">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(host.totalRevenue)}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Danh sách nhà đang cho thuê</h4>
                                    <div className="mt-2">
                                        <p className="text-gray-500 italic">Chưa có nhà nào.</p>
                                        <Link to="#" className="text-sm text-blue-600 hover:underline mt-1 inline-block">Xem danh sách nhà (tính năng sẽ được phát triển)</Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HostDetailPage;