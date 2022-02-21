// we can use uncontrolled componenet on when we have to use DOm like animation etc hover

import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('email input form', this.emailInputRef);
    // console.log('Password input form', this.passInputRef);
    console.log('this.state', this.state);
  };
  handleEmailChange = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value,
    });
  };
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passInputRef}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
