import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

const HostsTable = ({ hosts, onApprove, onReject, onToggleLock }) => {
    const navigate = useNavigate();

    const handleViewDetails = (hostId) => {
        navigate(`/admin/hosts/${hostId}`);
    };

    const renderStatus = (host) => {
        if (host.hostStatus === 'PENDING') {
            return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Chờ duyệt</Badge>;
        }
        if (host.hostStatus === 'REJECTED') {
            return <Badge variant="destructive" className="bg-gray-100 text-gray-800 border-gray-200">Đã từ chối</Badge>;
        }
        if (host.hostStatus === 'APPROVED') {
            return host.accountNonLocked
                ? <Badge className="bg-green-100 text-green-800 border-green-200">Đang hoạt động</Badge>
                : <Badge variant="destructive">Đã khóa</Badge>;
        }
        return null;
    };

    const renderActions = (host) => {
        if (host.hostStatus === 'PENDING') {
            return (
                <>
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => onApprove(host.id)}>Duyệt</Button>
                    <Button variant="destructive" size="sm" onClick={() => onReject(host.id)}>Từ chối</Button>
                </>
            );
        }
        if (host.hostStatus === 'APPROVED') {
            return (
                <Button
                    variant={host.accountNonLocked ? 'destructive' : 'default'}
                    size="sm"
                    onClick={() => onToggleLock(host.id)}
                    className={!host.accountNonLocked ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                    {host.accountNonLocked ? 'Khóa' : 'Mở khóa'}
                </Button>
            );
        }
        return null;
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Họ và tên</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Số điện thoại</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Doanh thu</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Số nhà</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Trạng thái</th>
                    <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Hành động</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {hosts.map((host) => (
                    <tr key={host.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleViewDetails(host.id)}>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">{host.fullName}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{host.phone}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(host.revenue)}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{host.propertyCount}</td>
                        <td className="py-4 px-6 whitespace-nowrap">{renderStatus(host)}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-center space-x-2" onClick={(e) => e.stopPropagation()}>
                            {renderActions(host)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HostsTable;