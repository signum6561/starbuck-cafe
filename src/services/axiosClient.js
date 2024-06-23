import { refresh } from '@redux/features/authSlice';
import store from '@redux/store';
import axios from 'axios';
import jwtService from './jwtService';
import { toast } from 'react-toastify';

let refreshPromise;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = jwtService.getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest.retry &&
      !originalRequest.noRefresh
    ) {
      if (!jwtService.isTokenExpired()) {
        return axiosInstance(originalRequest);
      }

      if (!refreshPromise) {
        refreshPromise = store
          .dispatch(refresh())
          .unwrap()
          .then(() => {
            refreshPromise = null;
          });
      }
      originalRequest.retry = true;
      await refreshPromise;
      return axiosInstance.request(originalRequest);
    }
    toast.error('Something is wrong!', {
      toastId: 'fetch',
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
