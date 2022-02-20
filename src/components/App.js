import React from 'react';
import { connect } from 'react-redux';
import { PostsList } from './';

import { fetchPosts } from '../actions/posts';

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
      <div>
        <PostsList posts={posts}></PostsList>;
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}
export default connect(mapStateToProps)(App);
