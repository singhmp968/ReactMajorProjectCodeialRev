import { ADD_POST, UPDATE_POST } from '../actions/actionTypes'; // this is responsible to estbalihing connection between action and reducers

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POST:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    default:
      return state;
  }
}
