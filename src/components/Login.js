// we can use uncontrolled componenet on when we have to use DOm like animation etc hover

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { login } from '../actions/auth';
// class Login extends Component {
//   constructor(props) {
//     super(props);
//     // this.emailInputRef = React.createRef();
//     // this.passInputRef = React.createRef();
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }
//   handleFormSubmit = (e) => {
//     e.preventDefault();
//     // console.log('email input form', this.emailInputRef);
//     // console.log('Password input form', this.passInputRef);
//     console.log('this.state', this.state);
//     const { email, password } = this.state;
//     if (email && password) {
//       this.props.dispatch(login(email, password)); // this suth is comming from the below as we have use connect function to call the props
//     }
//   };
//   handleEmailChange = (e) => {
//     console.log(e.target.value);
//     this.setState({
//       email: e.target.value,
//     });
//   };
//   handlePasswordChange = (e) => {
//     console.log(e.target.value);
//     this.setState({
//       password: e.target.value,
//     });
//   };
//   render() {
//     return (
//       <form className="login-form">
//         <span className="login-signup-header">Log In</span>
//         <div className="field">
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             // ref={this.emailInputRef}
//             onChange={this.handleEmailChange}
//           />
//         </div>
//         <div className="field">
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             // ref={this.passInputRef}
//             onChange={this.handlePasswordChange}
//           />
//         </div>
//         <div className="field">
//           <button onClick={this.handleFormSubmit}>Log In</button>
//         </div>
//       </form>
//     );
//   }
// }

// // export default Login;
// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }
// export default connect(mapStateToProps)(Login);

/**
 * 
 * 
 * 
 * 
 * 
 
// we can use uncontrolled componenet on when we have to use DOm like animation etc hover

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from 'react-redux/lib/connect/mapStateToProps';
import { login } from '../actions/auth';

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
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password)); // this suth is comming from the below as we have use connect function to call the props
    }
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
    const { error, inProgress } = this.props.auth; // this suth is comming from the below as we have use connect function to call the props
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">error</div>}
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
          <button onClick={this.handleFormSubmit} disabled={inProgress}>
            Log In
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);



 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

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
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password)); // this suth is comming from the below as we have use connect function to call the props
    }
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
    const { error, inProgress } = this.props.auth; // this suth is comming from the below as we have use connect function to call the props
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">error</div>}
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
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging In...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  // console.log('this state is store dont confyuse===>', state);
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
