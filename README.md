# HouseRent - Frontend

Dự án Frontend cho nền tảng thuê nhà trọ, được xây dựng với React, TailwindCSS, và ShadCN UI.

## Công nghệ sử dụng

- **React 19** - UI Framework
- **Vite** - Build tool và Dev server
- **TailwindCSS** - CSS Framework
- **ShadCN UI** - Component library
- **React Router Dom** - Routing
- **React Hook Form** - Form handling
- **Yup** - Validation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## Cấu trúc dự án

```
src/
├───components/           # Shared components
│   ├───layout/          # Layout components (Header, Footer, etc.)
│   └───ui/              # UI components (Button, Card, etc.)
├───lib/                 # Library utilities
├───modules/             # Feature modules
│   ├───auth/           # Authentication module
│   │   ├───components/ # Auth-specific components
│   │   ├───contexts/   # Auth context
│   │   ├───pages/      # Auth pages
│   │   └───services/   # Auth API services
│   ├───housing/        # Housing module
│   │   ├───components/
│   │   ├───contexts/
│   │   ├───pages/
│   │   └───services/
│   └───profile/        # Profile module
│       ├───components/
│       ├───pages/
│       └───services/
└───shared/             # Shared utilities
    ├───config/         # App configuration
    ├───constants/      # App constants
    ├───contexts/       # Shared contexts
    ├───hooks/          # Custom hooks
    ├───services/       # Shared services
    └───utils/          # Utility functions
```

## Tính năng đã implement

### Xác thực (Authentication)

- ✅ Đăng ký tài khoản người dùng
- ✅ Đăng ký tài khoản chủ nhà
- ✅ Đăng nhập
- ✅ Đăng xuất
- ✅ Context quản lý trạng thái auth
- ✅ Protected routes
- ✅ Validation form đầy đủ
- 🚧 Đăng nhập Google (UI sẵn sàng)

### Profile Management

- ✅ Xem và cập nhật thông tin cá nhân
- ✅ Đổi mật khẩu
- ✅ Upload avatar
- ✅ Validation đầy đủ

### UI Components

- ✅ Button, Input, Card, Label components
- ✅ Toast notifications
- ✅ Header/Footer layout
- ✅ Responsive design
- ✅ Dark mode support (cấu hình sẵn)

### Pages

- ✅ Login/Register pages
- ✅ News Feed (Dashboard)
- ✅ Profile page
- ✅ Housing list page (UI placeholder)

## Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Environment Variables

Tạo file `.env` trong thư mục root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## API Integration

Dự án đã cấu hình sẵn:

- Axios client với interceptors
- Automatic token handling
- Error handling
- API endpoints constants

### Cách sử dụng API Service:

```javascript
import authService from "./modules/auth/services/authService";

// Login
const result = await authService.login({ username, password });

// Register
await authService.register({ username, phone, password });
```

## Validation Rules

- **Username**: 3-20 ký tự, chỉ chữ cái, số và dấu gạch dưới
- **Password**: 6-32 ký tự (đăng ký), 6-8 ký tự (đổi pass), không chứa \*, %, , '
- **Phone**: 10-11 số
- **Full Name**: Không chứa ký tự đặc biệt

## State Management

Sử dụng React Context cho:

- Authentication state
- User information
- Loading states

## Styling

- TailwindCSS với custom theme
- ShadCN UI components
- Responsive design
- Consistent color scheme

## Routing

```
/                     -> Redirect to /news-feed
/login               -> Login page
/register            -> Register page
/register-landlord   -> Landlord register
/news-feed           -> Dashboard (protected)
/housing             -> Housing list (protected)
/profile             -> Profile page (protected)
```

## Các task tiếp theo

### Housing Module

- [ ] Tạo Housing service
- [ ] Housing detail page
- [ ] Search & filter functionality
- [ ] Favorite system

### Landlord Features

- [ ] Property management
- [ ] Create/edit property
- [ ] Dashboard statistics

### Additional Features

- [ ] Google OAuth implementation
- [ ] Forgot password
- [ ] Email verification
- [ ] Real-time notifications
- [ ] Image upload with preview

## Best Practices

1. **Module Structure**: Mỗi feature được tổ chức thành module riêng
2. **Component Reusability**: UI components có thể tái sử dụng
3. **Error Handling**: Centralized error handling
4. **Validation**: Client-side validation với feedback
5. **Responsive**: Mobile-first design
6. **Performance**: Lazy loading, code splitting
7. **Security**: Protected routes, token management

## Deployment

Build project:

```bash
npm run build
```

Deploy folder `dist/` lên server static hosting (Vercel, Netlify, etc.)

## Contributing

1. Tạo branch mới cho feature
2. Implement theo cấu trúc module hiện tại
3. Tuân thủ naming conventions
4. Test đầy đủ trước khi merge
