export const setSession = (user, isAdmin) => {
    localStorage.setItem('auth', JSON.stringify({ user, isAdmin }));
};
  
export const getSession = () => {
  return JSON.parse(localStorage.getItem('auth'));
};
  
export const clearSession = () => {
  localStorage.removeItem('auth');
};