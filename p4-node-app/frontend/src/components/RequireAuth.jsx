import { Navigate } from 'react-router';

const RequireAuth = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
  const isGuestLoggedIn = localStorage.getItem('gisGuestLoggedIn') === 'true';

  const isLoggedIn = isUserLoggedIn || isGuestLoggedIn;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;