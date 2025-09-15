import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import MainLayout from '../../../components/layout/MainLayout';
import UsersTable from '../components/UsersTable';
import { Button } from '../../../components/ui/button';
import adminService from '../services/adminService';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async (currentPage) => {
    setIsLoading(true);
    try {
      const data = await adminService.getUsers(currentPage);
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setPage(data.number);
    } catch (error) {
      toast.error('Không thể tải danh sách người dùng.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page);
  }, [fetchUsers, page]);

  const handleToggleStatus = async (userId) => {
    try {
      const response = await adminService.toggleUserStatus(userId);
      toast.success(response.message);
      fetchUsers(page); 
    } catch (error) {
      toast.error('Thao tác thất bại.');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        </div>
        
        {isLoading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <UsersTable users={users} onToggleStatus={handleToggleStatus} />
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

export default UserListPage;