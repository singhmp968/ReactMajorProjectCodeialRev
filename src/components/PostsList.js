import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import Post from './Post';
class PostsList extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    );
  }
}
PostsList.propTypes = {
  // here we use propTypes form valadating that the comming props is of required type or not
  posts: PropTypes.array.isRequired,
  //posts: PropTypes.string.isRequired, here it will throw warning in c.log as its array not string
};
export default connect()(PostsList);
