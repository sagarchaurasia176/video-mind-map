export const clearDeviceToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_session_token');
  }
};
