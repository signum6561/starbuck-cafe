import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtService from '@services/jwtService';

export default function AuthLayout({ children, isPublic = false }) {
  const refreshToken = jwtService.getRefreshToken();

  if (refreshToken && isPublic) {
    return <Navigate to='/' replace />;
  }

  if (!refreshToken && !isPublic) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  isPublic: PropTypes.bool,
};
