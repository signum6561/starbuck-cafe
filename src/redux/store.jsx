import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './customerSlice';
// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    customerReducer: customerSlice,
  },
});
