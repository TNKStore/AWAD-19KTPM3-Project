import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = getLocalStorage('token')
    const { isExpired } = useJwt(token || {});

    if (isExpired) {
      return <Navigate to="/login" />;
    }
    return children;
  };