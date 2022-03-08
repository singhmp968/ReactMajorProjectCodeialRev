import {
  ADD_COMMENT,
  ADD_POST,
  UPDATE_POST,
  UPDATE_POST_LIKE,
} from '../actions/actionTypes'; // this is responsible to estbalihing connection between action and reducers

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POST:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;
    case UPDATE_POST_LIKE:
      const updatedPost = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return updatedPost;
    default:
      return state;
  }
}
