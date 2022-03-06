// unControlled compoenent are those where data are no managed by react and it is managed by DOM

import React from 'react';
import { connect } from 'react-redux';
import {
  PostsList,
  Navbar,
  Home,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
import { fetchPosts } from '../actions/posts';
import * as jwtDecode from 'jwt-decode';
import { authenticteUser } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import { fetchUserFriends } from '../actions/friends';

// const Home = () => <div>Home</div>;

// const Login = () => <div>Logiasdafafadfn</div>;
// const Signup = () => <div>Signup</div>;
// const Setting = () => <div>settings</div>;
const PrivateRoute = (privateRoutesProps) => {
  const { isLoggedin, path, component: Component } = privateRoutesProps;
  return (
    <Route
      path={path}
      render={(props) => {
        // here we have seen that bu using this method we can redirect to / when ever we are  in any page like we are in setting then on refresh it is redirecting us to / page
        // return isLoggedin ? <Component {...props} /> : <Redirect to="/login" />;
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location, // it will be someting like this {pathname:'/settings}
              },
            }}
          />
        );
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());
    console.log('props is', this.props);
    this.props.dispatch(fetchPosts());
    // checking if the token is present in the local storege
    const token = localStorage.getItem('token');
    if (token) {
      // usig jwt decode to get the user details out of it
      const user = jwtDecode(token);
      console.log('jwt decode->', user);
      this.props.dispatch(
        authenticteUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriends(user._id));
    }
  }

  render() {
    console.log('PROPS=>', this.props);

    const { posts, auth, friends } = this.props;
    console.log('friends==>', friends);
    return (
      <Router>
        <div>
          <Navbar></Navbar>
          {/* <PostsList posts={posts}></PostsList> */}
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul> */}
          <Switch>
            <Route
              /* here we will only get the props value and rest parama like history will gone  there for inorder to solve we have to  */
              // there fore we need to pass it in props
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/setting"
              component={Settings} // passing the route in the privateRoute componenet
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
          {/*  />
          <Route path="/signup" component={Signup} /> */}
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(App);
