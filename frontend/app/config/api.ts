export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

// Helper function to get full API URL
export const getApiUrl = (path: string) => `${API_BASE_URL}/api${path}`;

export const API_ENDPOINTS = {
  ADMIN: {
    CHECK: `${API_BASE_URL}/api/admin/check`,
    REGISTER: `${API_BASE_URL}/api/admin/register`,
    REGISTER_2FA: `${API_BASE_URL}/api/admin/register/verify-2fa`,
    LOGIN: `${API_BASE_URL}/api/admin/login`,
    LOGIN_2FA: `${API_BASE_URL}/api/admin/login/verify-2fa`,
    VERIFY_2FA: `${API_BASE_URL}/api/admin/verify-2fa`,
    LIST: `${API_BASE_URL}/api/admin`,
  },
}; 