import { combineReducers } from 'redux';
import posts from './post';
// here we will be combining all the reducers and then we will be sending it to store file
export default combineReducers({ posts });
