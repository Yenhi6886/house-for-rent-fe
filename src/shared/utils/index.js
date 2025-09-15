import { VALIDATION_RULES } from '../constants'

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

// Validate username
export const validateUsername = (username) => {
  const errors = []
  
  if (!username) {
    errors.push('Tên đăng nhập không được để trống')
  } else {
    if (username.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
      errors.push(`Tên đăng nhập phải có ít nhất ${VALIDATION_RULES.USERNAME.MIN_LENGTH} ký tự`)
    }
    if (username.length > VALIDATION_RULES.USERNAME.MAX_LENGTH) {
      errors.push(`Tên đăng nhập không được vượt quá ${VALIDATION_RULES.USERNAME.MAX_LENGTH} ký tự`)
    }
    if (!VALIDATION_RULES.USERNAME.PATTERN.test(username)) {
      errors.push('Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate password
export const validatePassword = (password) => {
  const errors = []
  
  if (!password) {
    errors.push('Mật khẩu không được để trống')
  } else {
    if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
      errors.push(`Mật khẩu phải có ít nhất ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} ký tự`)
    }
    if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
      errors.push(`Mật khẩu không được vượt quá ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} ký tự`)
    }
    if (!VALIDATION_RULES.PASSWORD.PATTERN.test(password)) {
      errors.push('Mật khẩu không được chứa các ký tự đặc biệt: *, %, , \'')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate phone number
export const validatePhone = (phone) => {
  const errors = []
  
  if (!phone) {
    errors.push('Số điện thoại không được để trống')
  } else {
    if (!VALIDATION_RULES.PHONE.PATTERN.test(phone)) {
      errors.push('Số điện thoại không hợp lệ')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate confirm password
export const validateConfirmPassword = (password, confirmPassword) => {
  const errors = []
  
  if (!confirmPassword) {
    errors.push('Vui lòng xác nhận mật khẩu')
  } else if (password !== confirmPassword) {
    errors.push('Mật khẩu xác nhận không khớp')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate full name
export const validateFullName = (fullName) => {
  const errors = []
  
  if (!fullName || !fullName.trim()) {
    errors.push('Họ và tên không được để trống')
  } else {
    if (VALIDATION_RULES.SPECIAL_CHARS.test(fullName)) {
      errors.push('Họ và tên không được chứa các ký tự đặc biệt: *, %, , \'')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Format currency (VND)
export const formatCurrency = (amount) => {
  if (!amount) return '0 VNĐ'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken')
  return !!token
}

// Get user info from localStorage
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

// Clear auth data
export const clearAuthData = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userInfo')
}

// Generate default avatar URL
export const getDefaultAvatar = (name) => {
  if (!name) return '/default-avatar.png'
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  return `https://ui-avatars.com/api/?name=${initials}&background=3b82f6&color=fff&size=100`
}

// Handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        return data.message || 'Dữ liệu không hợp lệ'
      case 401:
        return 'Phiên đăng nhập đã hết hạn'
      case 403:
        return 'Không có quyền truy cập'
      case 404:
        return 'Không tìm thấy dữ liệu'
      case 409:
        return 'Dữ liệu đã tồn tại'
      case 500:
        return 'Lỗi server'
      default:
        return data.message || 'Có lỗi xảy ra'
    }
  } else if (error.request) {
    // Network error
    return 'Lỗi kết nối mạng'
  } else {
    return 'Có lỗi xảy ra'
  }
}
