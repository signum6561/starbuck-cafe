import { useContext, createContext, useState } from 'react';
const AuthContext = createContext();
import PropTypes from 'prop-types';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  const login = async (data) => {
    await axios
      .post(`${BASE_URL}/login`, data)
      .then((res) => res.data)
      .then((res) => {
        localStorage.setItem('userToken', res.token);
        setToken(res.token);
      });
  };

  const register = async (data) => {
    await axios
      .post(`${BASE_URL}/register`, data)
      .then((res) => res.data)
      .then((res) => {
        localStorage.setItem('userToken', res.token);
        setToken(res.token);
      });
  };

  const logout = async () => {
    await axios.post(`${BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchUser = async () => {
    await axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((res) => setUser(res.data));
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, register, fetchUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
