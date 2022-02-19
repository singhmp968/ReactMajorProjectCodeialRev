import { UPDATE_POST } from './actionTypes';
export function fetchPosts() {
  // creating thunk
  return function (dispatch) {
    const url = `http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5`;
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
