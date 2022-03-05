import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE,
} from './actionTypes';
// here we are dispatching action to reducers
export function startUserProfile() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

// creating thunk for fetching the profile

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfile());

    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(userProfileSuccess(data.data.user));
        return;
      });
  };
}
