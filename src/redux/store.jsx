import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './features/customerSlice';
import authSlice from './features/authSlice';
// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    customer: customerSlice,
    auth: authSlice,
  },
});
