// writhin the action of auth

import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';

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
          // dispatch action to save the user
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
