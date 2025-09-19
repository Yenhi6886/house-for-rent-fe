import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import MainLayout from '../../../components/layout/MainLayout';
import HostsTable from '../components/HostsTable';
import { Button } from '../../../components/ui/button';
import adminService from '../services/adminService';

const HostListPage = () => {
    const [hosts, setHosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHosts = useCallback(async (currentPage) => {
        setIsLoading(true);
        try {
            const data = await adminService.getHosts(currentPage);
            setHosts(data.content);
            setTotalPages(data.totalPages);
            setPage(data.number);
        } catch (error) {
            toast.error('Không thể tải danh sách chủ nhà.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHosts(page);
    }, [fetchHosts, page]);

    const handleAction = async (action, hostId, successMessage, confirmationMessage) => {
        if (window.confirm(confirmationMessage)) {
            try {
                await action(hostId);
                toast.success(successMessage);
                fetchHosts(page);
            } catch (error) {
                toast.error('Thao tác thất bại.');
            }
        }
    };

    const handleApprove = (hostId) => {
        handleAction(
            adminService.approveHost,
            hostId,
            'Duyệt chủ nhà thành công.',
            'Bạn có chắc chắn muốn duyệt chủ nhà này?'
        );
    };

    const handleReject = (hostId) => {
        handleAction(
            adminService.rejectHost,
            hostId,
            'Từ chối chủ nhà thành công.',
            'Bạn có chắc chắn muốn từ chối chủ nhà này?'
        );
    };

    const handleToggleLock = (hostId) => {
        const host = hosts.find(h => h.id === hostId);
        const actionMessage = host.accountNonLocked ? 'khóa' : 'mở khóa';
        handleAction(
            adminService.toggleUserStatus,
            hostId,
            `Thay đổi trạng thái thành công.`,
            `Bạn có chắc chắn muốn ${actionMessage} tài khoản này?`
        );
    };

    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Quản lý chủ nhà</h1>
                </div>

                {isLoading ? (
                    <p>Đang tải...</p>
                ) : (
                    <>
                        <HostsTable
                            hosts={hosts}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onToggleLock={handleToggleLock}
                        />
                        <div className="flex justify-center items-center mt-6 space-x-2">
                            <Button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
                                Trang trước
                            </Button>
                            <span>Trang {page + 1} / {totalPages}</span>
                            <Button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
                                Trang sau
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
};

export default HostListPage;