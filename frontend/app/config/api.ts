export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  ADMIN: {
    CHECK: `${API_BASE_URL}/admin/check`,
    REGISTER: `${API_BASE_URL}/admin/register`,
    REGISTER_2FA: `${API_BASE_URL}/admin/register/verify-2fa`,
    LOGIN: `${API_BASE_URL}/admin/login`,
    LOGIN_2FA: `${API_BASE_URL}/admin/login/verify-2fa`,
    VERIFY_2FA: `${API_BASE_URL}/admin/verify-2fa`,
  },
}; 