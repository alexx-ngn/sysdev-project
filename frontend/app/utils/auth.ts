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
    // Dispatch storage event for cross-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'milesforhope-admin-token',
        newValue: token
    }));
};

export const clearAuth = () => {
    localStorage.removeItem('milesforhope-admin-token');
    localStorage.removeItem('milesforhope-admin-info');
    // Remove cookie if it exists
    if (typeof document !== 'undefined') {
        document.cookie = 'milesforhope-admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    // Dispatch storage event for cross-tab synchronization
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'milesforhope-admin-token',
        oldValue: localStorage.getItem('milesforhope-admin-token'),
        newValue: null
    }));
}; 