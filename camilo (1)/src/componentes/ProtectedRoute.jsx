// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { getUserSession } from '../service/session';

const ProtectedRoute = ({ element }) => {
  const user = getUserSession();
  return user ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
