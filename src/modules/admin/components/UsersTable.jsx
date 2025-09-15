import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

const UsersTable = ({ users, onToggleStatus }) => {
  const navigate = useNavigate();

  const handleViewDetails = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Họ và tên</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Số điện thoại</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Trạng thái</th>
            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.phone}</td>
              <td className="py-4 px-6 whitespace-nowrap">
                {user.accountNonLocked ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">Đang hoạt động</Badge>
                ) : (
                  <Badge variant="destructive">Đã khóa</Badge>
                )}
              </td>
              <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(user.id)}>Chi tiết</Button>
                <Button
                  variant={user.accountNonLocked ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => onToggleStatus(user.id)}
                  className={!user.accountNonLocked ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {user.accountNonLocked ? 'Khóa' : 'Mở khóa'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;