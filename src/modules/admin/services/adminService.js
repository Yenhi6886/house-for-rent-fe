import apiClient from '../../../shared/config/api';
import { handleApiError } from '../../../shared/utils';

class AdminService {
  async getUsers(page = 0, size = 10) {
    try {
      const response = await apiClient.get(`/admin/users?page=${page}&size=${size}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async getUserDetails(userId) {
    try {
      const response = await apiClient.get(`/admin/users/${userId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async toggleUserStatus(userId) {
    try {
      const response = await apiClient.put(`/admin/users/${userId}/toggle-lock`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export default new AdminService();