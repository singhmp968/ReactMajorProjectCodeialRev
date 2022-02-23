import { APIUrls } from '../helpers/urls';
import { UPDATE_POST } from './actionTypes';
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
