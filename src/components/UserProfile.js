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
  checkIfUserIsAFriend = () => {
    console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId; //  getting teh userId value fro te url paramas
    const index = friends.map((firend) => firend.to_user._id).indexOf(userId); //  here we getting all the freiends list fro the array and then finding the userId from the parama and checkin gif the firend exist or not
    if (index !== -1) {
      return true;
    }
    return false;
  };
  render() {
    console.log('insidecdm==>', this.props);
    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;
    if (profile.inProgress) {
      return <h1>Loading...</h1>;
    }
    const isUserAFriend = this.checkIfUserIsAFriend();

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button className="button save-btn">Add Friend</button>
          ) : (
            <button className="button save-btn">Remove Friend</button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
