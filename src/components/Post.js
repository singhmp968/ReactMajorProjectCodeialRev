import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addLike, createComments } from '../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }
  handleOnCommentChange = (e) => {
    console.log(e.target.value);
    this.setState({
      comment: e.target.value,
    });
    console.log('lopo', this.state.comment);
  };
  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;
    console.log('postsIs sis', post._id);
    if (e.key === 'Enter') {
      this.props.dispatch(createComments(comment, post._id));
      //celaring comment
      this.setState({
        comment: '',
      });
    }
  };
  handlePostLike = () => {
    const { post, user } = this.props;
    this.props.dispatch(addLike(post._id, 'Post', user._id));
  };
  render() {
    const { post, user } = this.props;
    const { comment } = this.state;
    const isPostLikedByUser = post.likes.includes(user._id);
    console.log('props is', post);
    return (
      <div className="posts-list">
        <div className="post-wrapper" key={post._id}>
          <div className="post-header">
            <div className="post-avatar">
              <Link to={`/user/${post.user._id}`}>
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />
              </Link>
              <div>
                <span className="post-author">{post.user.name}</span>
                <span className="post-time">a minute ago</span>
              </div>
            </div>
            <div className="post-content">{post.content}</div>

            <div className="post-actions">
              <button
                className="post-like no-btn"
                onClick={this.handlePostLike}
              >
                {isPostLikedByUser ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-post"
                  />
                )}
                <span>{post.likes.length}</span>
              </button>

              <div className="post-comments-icon">
                <img
                  src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>

            <div className="post-comment-box">
              {/* for handling the comments */}

              <input
                placeholder="Start typing a comment"
                onChange={this.handleOnCommentChange}
                onKeyPress={this.handleAddComment}
                value={comment}
              />
            </div>

            <div className="post-comments-list">
              {post.comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment._id}
                  postId={post._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Post);
