import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    // console.log('insidecdm==>', this.props);
    let { match } = this.props;
    console.log('mattch is ', match.params.userId);
    if (match.params.userId) {
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: { params: prevParams },
    } = prevProps;
    const {
      match: { params: currentParams },
    } = this.props;
    if (
      prevParams &&
      currentParams &&
      prevParams.userId !== currentParams.userId
    ) {
      this.props.dispatch(fetchUserProfile(currentParams.userId));
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
  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Friend Added success fullu',
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
        successMessage: null,
      });
    }
  };
  handleRemoveFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.removeFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Friend Remove success fully',
      });
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
        successMessage: null,
      });
    }
  };
  render() {
    const { successMessage } = this.state;
    console.log('insidecdm==>', this.props);
    console.log('successMessage', successMessage);

    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;
    if (profile.inProgress) {
      return <h1>Loading...</h1>;
    }
    const isUserAFriend = this.checkIfUserIsAFriend();
    const { success, error } = this.state;
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
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}
          {success && (
            <div className="alert success-dailog">{successMessage}</div>
          )}
          {error && <div className="alert error-dailog">{error}</div>}
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
