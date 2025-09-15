// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    SOCIAL_LOGIN: '/auth/social',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // User/Profile endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    UPLOAD_AVATAR: '/user/avatar',
  },
  
  // Housing endpoints
  HOUSING: {
    LIST: '/housing',
    CREATE: '/housing',
    DETAIL: '/housing/:id',
    UPDATE: '/housing/:id',
    DELETE: '/housing/:id',
    SEARCH: '/housing/search',
    FILTER: '/housing/filter',
    FAVORITES: '/housing/favorites',
  },
  
  // Landlord endpoints
  LANDLORD: {
    REGISTER: '/landlord/register',
    PROFILE: '/landlord/profile',
    PROPERTIES: '/landlord/properties',
    DASHBOARD: '/landlord/dashboard',
  }
}

// User Roles
export const USER_ROLES = {
  TENANT: 'tenant',
  LANDLORD: 'landlord',
  ADMIN: 'admin'
}

// Housing Status
export const HOUSING_STATUS = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  PENDING: 'pending',
  INACTIVE: 'inactive'
}

// Form validation rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 32,
    PATTERN: /^[^*%,']+$/ // Không cho phép *, %, , '
  },
  PHONE: {
    PATTERN: /^[0-9]{10,11}$/
  },
  SPECIAL_CHARS: /[*%,']/
}

// Toast messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Đăng nhập thành công!',
    REGISTER: 'Đăng ký thành công!',
    LOGOUT: 'Đăng xuất thành công!',
    UPDATE_PROFILE: 'Cập nhật thông tin thành công!',
    CHANGE_PASSWORD: 'Đổi mật khẩu thành công!',
  },
  ERROR: {
    LOGIN_FAILED: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!',
    REGISTER_FAILED: 'Đăng ký thất bại!',
    DUPLICATE_USER: 'Tên đăng nhập hoặc email đã tồn tại!',
    INVALID_CREDENTIALS: 'Thông tin đăng nhập không chính xác!',
    PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp!',
    SAME_PASSWORD: 'Mật khẩu mới không được trùng với mật khẩu cũ!',
    NETWORK_ERROR: 'Lỗi kết nối mạng!',
    SERVER_ERROR: 'Lỗi server!',
    INVALID_INPUT: 'Dữ liệu đầu vào không hợp lệ!',
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LANGUAGE: 'language'
}
