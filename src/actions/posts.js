import { func } from 'prop-types';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
  ADD_COMMENT,
  ADD_POST,
  UPDATE_POST,
  UPDATE_POST_LIKE,
} from './actionTypes';
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

// creating action for comments
export function createComments(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    console.log('adasdasd-->');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('comments data is ', data);
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
          return;
        }
      });
  };
}
// comment adding
export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}
// like to post
export function addLike(id, likeType, userId) {
  // id of post and commet and type of like post or comment and who make this like userId
  return (dispatch) => {
    const url = APIUrls.toggleLike(id, likeType);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('LIKE DATA', data);
        if (data.success) {
          dispatch(addLikeTOStore(id, userId));
          return;
        }
      });
  };
}
export function addLikeTOStore(postId, userID) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userID,
  };
}
