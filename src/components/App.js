import React from 'react';
import { connect } from 'react-redux';
import { PostsList, Navbar } from './';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { fetchPosts } from '../actions/posts';
const Home = () => <div>Home</div>;

const Login = () => <div>Logiasdafafadfn</div>;
const Signup = () => <div>Signup</div>;
class App extends React.Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());
    console.log('props is', this.props);
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('PROPS=>', this.props);

    const { posts } = this.props;

    return (
      <Router>
        <div>
          <Navbar></Navbar>
          {/* <PostsList posts={posts}></PostsList> */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}
export default connect(mapStateToProps)(App);
