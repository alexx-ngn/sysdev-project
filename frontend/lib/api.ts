const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  ADMIN: {
    CHECK: `${baseURL}/api/admin/check`,
    REGISTER: `${baseURL}/api/admin/register`,
    VERIFY_2FA: `${baseURL}/api/admin/verify-2fa`,
    USERS: `${baseURL}/api/admin/users`,
  },
  REGISTRATIONS: `${baseURL}/api/registrations`,
  DONATIONS: `${baseURL}/api/donations`,
  USERS: `${baseURL}/api/users`,
  VERIFY_PAYMENT: `${baseURL}/api/verify-payment`,
  CREATE_CHECKOUT_SESSION: `${baseURL}/api/create-checkout-session`,
};

const defaultHeaders = {
  'Accept': 'application/json',
  'ngrok-skip-browser-warning': 'true'
};

export const api = {
  get: async (url: string) => {
    const response = await fetch(url, {
      headers: defaultHeaders,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  post: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  put: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        ...defaultHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  delete: async (url: string) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: defaultHeaders,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
}; 