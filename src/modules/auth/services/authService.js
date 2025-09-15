import apiClient from '../../../shared/config/api'
import { API_ENDPOINTS, STORAGE_KEYS } from '../../../shared/constants'
import { handleApiError } from '../../../shared/utils'

class AuthService {
  async login(credentials) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
      const apiResponse = response.data
      
      if (apiResponse.success && apiResponse.data) {
        const { token, userInfo } = apiResponse.data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
        return { userInfo, token }
      } else {
        throw new Error(apiResponse.message || 'Đăng nhập không thành công')
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async register(userData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
      const apiResponse = response.data;
      if (!apiResponse.success) {
        throw new Error(apiResponse.message || 'Đăng ký không thành công');
      }
      return apiResponse
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async registerLandlord(userData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LANDLORD.REGISTER, {
        ...userData,
        isLandlord: true
      })
      const apiResponse = response.data;
      if (!apiResponse.success) {
        throw new Error(apiResponse.message || 'Đăng ký không thành công');
      }
      return apiResponse
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async socialLogin(provider, token) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, {
        provider,
        token
      })
      const apiResponse = response.data
      if (apiResponse.success && apiResponse.data) {
        const { authToken, ...user } = apiResponse.data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken)
        return { user, token: authToken }
      } else {
         throw new Error(apiResponse.message || 'Đăng nhập không thành công')
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER_INFO)
    }
  }

  async refreshToken() {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH)
      const { token } = response.data.data
      
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
      return token
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async forgotPassword(email) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        newPassword
      })
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  isTokenValid() {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (!token) return false
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      
      return payload.exp > currentTime
    } catch {
      return false
    }
  }

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }
}

export default new AuthService()