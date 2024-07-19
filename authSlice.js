import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import store from './store';

const userFromCookie = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : "";
const tokenFromCookie = Cookies.get('token') ? Cookies.get('token') : "";

const initialState = {
  user: userFromCookie,
  token: tokenFromCookie,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7 });
      Cookies.set('token', action.payload.token, { expires: 7 });
    },
    logout: (state) => {
      state.user = "";
      state.token = "";
      Cookies.remove('user');
      Cookies.remove('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const getCurrentUsername = () => {
  const state = store.getState();
  const user = state.auth.user;
  return user ? user.username : 'Guest';
};
export const getCurrentPhone = () => {
  const state = store.getState();
  const user = state.auth.user;
  return user ? user.phone : 'none';
};

export default authSlice.reducer;