export const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('milesforhope-admin-token');
};

export const getAuthUser = () => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('milesforhope-admin-info');
    return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const setAuth = (token: string, user: any) => {
    localStorage.setItem('milesforhope-admin-token', token);
    localStorage.setItem('milesforhope-admin-info', JSON.stringify(user));
};

export const clearAuth = () => {
    localStorage.removeItem('milesforhope-admin-token');
    localStorage.removeItem('milesforhope-admin-info');
}; 