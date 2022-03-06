import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend } from '../actions/friends';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
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
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
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
            <button className="button save-btn">Remove Friend</button>
          )}
          {success && (
            <div className="alert success-dailog">
              Friend Added success fully
            </div>
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
