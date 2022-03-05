import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';

class UserProfile extends Component {
  componentDidMount() {
    // console.log('insidecdm==>', this.props);
    let { match } = this.props;
    console.log('mattch is ', match.params.userId);
    if (match.params.userId) {
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  render() {
    console.log('insidecdm==>', this.props);

    return <div>hi man</div>;
  }
}

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}
export default connect(mapStateToProps)(UserProfile);
