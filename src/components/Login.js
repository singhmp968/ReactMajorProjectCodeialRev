import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passInputRef = React.createRef();
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('email input form', this.emailInputRef);
    console.log('Password input form', this.passInputRef);
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
            ref={this.emailInputRef}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            ref={this.passInputRef}
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
