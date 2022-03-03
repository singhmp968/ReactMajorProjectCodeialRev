// writhin the action of auth

import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
} from './actionTypes';
//asdasdas

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
// login failed
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
//LOGIN SUCCESS
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
// '/login?email=a@a.com&password=123'
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // as api written accept this format only written by sir
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          // dispatch action to save the user
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

// signup logic
export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    dispatch(startSignup());
    const url = APIUrls.signup();
    console.log('url->', url);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data is =>', data);
        if (data.success) {
          console.log('created success full');
          dispatch(signupSuccess(data.data));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}
export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}
// login failed
export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}
//LOGIN SUCCESS
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

// for authenticating the user
export function authenticteUser(user) {
  return { type: AUTHENTICATE_USER, user };
}
export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
export function editUsersuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}
export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}
// method for sending the edit request
export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          dispatch(editUsersuccessful(data.data.user));
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editUserFailed(data.message));
      });
  };
}
