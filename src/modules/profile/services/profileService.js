import apiClient from '../../../shared/config/api'
import { handleApiError } from '../../../shared/utils'

class ProfileService {
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/auth/profile', profileData)
      if (response.data && !response.data.success) {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await apiClient.put('/auth/change-password', passwordData)
      if (response.data && !response.data.success) {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async uploadAvatar(file) {
    try {
      const formData = new FormData()
      formData.append('file', file) 
      
      const response = await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data && !response.data.success) {
        throw new Error(response.data.message)
      }
      return response.data.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }
}

export default new ProfileService()