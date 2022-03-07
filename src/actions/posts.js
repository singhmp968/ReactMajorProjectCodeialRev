import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import { ADD_POST, UPDATE_POST } from './actionTypes';
export function fetchPosts() {
  // creating thunk
  return function (dispatch) {
    const url = APIUrls.fetchPost();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('data is', data);
        // dispatch and action
        dispatch(updatePost(data.data.posts));
      });
  };
}
// here we are dispatching action to reducers
export function updatePost(posts) {
  return {
    type: UPDATE_POST,
    posts: posts,
  };
}
// adding post
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}
export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        console.log('Data==> ', data);
        if (data.success) {
          dispatch(addPost(data.data.post));
          return;
        }
      });
  };
}
