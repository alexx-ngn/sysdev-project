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

export const api = {
  get: async (url: string) => {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
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
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
}; 