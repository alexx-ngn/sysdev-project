const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = {
  post: async (url: string, data: any) => {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
}; 