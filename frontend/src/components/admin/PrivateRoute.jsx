import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;