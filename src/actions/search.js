import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { FETCH_SEARCH_RESULT_SUCCESS } from './actionTypes';
export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        console.log('Search result', data);
        if (data.success) {
          dispatch(searchResultSuccess(data.data.users));
        } else {
          dispatch(searchResultSuccess([]));
        }
      });
  };
}

export function searchResultSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULT_SUCCESS,
    users,
  };
}
