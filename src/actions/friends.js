import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from './actionTypes';

export function fetchUserFriends(userId) {
  console.log('user_id', userId);
  return (dispatch) => {
    const url = APIUrls.userFriends();
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('friends data', data.data.friends);
        dispatch(fetchFriendsSucces(data.data.friends));
      });
  };
}

export function fetchFriendsSucces(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

// creating think for friends
// export function fetchUserFriends(userId) {
// {
//     return(dispatch)=>{
//         url = APIUrls.userFriends(userId);
//         fetch(url,{
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//               },
//         })
//         .then((response) => response.json())
//       .then((data) => {
//         console.log('data', data);
//         dispatch(fetchFriendsSucces(data.data.friends));
//       });
//     };
// }

// // creatnfg friends type
// export function fetchFriendsSucces(friends) {
//   return {
//     type: FETCH_FRIENDS_SUCCESS,
//     friends,
//   };
// }

// addd frends action
export function addFriend(friend) {
  return { type: ADD_FRIEND, friend };
}
