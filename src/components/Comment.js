import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    console.log('comments is', comment);
    return (
      <div className="post-comments-item">
        <div className="post-comment-header">
          <span className="post-comment-author">{comment.user.name}</span>
          <span className="post-comment-time">
            {comment.likes.length} likes
          </span>
          <span className="post-comment-likes">22</span>
        </div>

        <div className="post-comment-content">{comment.content}</div>
      </div>
    );
  }
}

export default Comment;
