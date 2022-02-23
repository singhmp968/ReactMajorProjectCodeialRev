// writhin the action of auth

import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/Utils';
import { LOGIN_START } from './actionTypes';

//asdasdas

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
// '/login?email=a@a.com&password=123'
export function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login();
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // as api written accept this format only written by sir
      },
      body: getFormBody({ email, password }),
    });
  };
}
