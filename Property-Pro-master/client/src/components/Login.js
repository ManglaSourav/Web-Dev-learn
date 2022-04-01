import React, { Component } from "react";
import "./auth.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    return (
      <div>
        <div id='login'>
          <div className='login-card'>
            <div className='card-title'>
              <h1>Please Sign In</h1>
            </div>

            <div className='content'>
              <form>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder='Email'
                  required
                />
                <input
                  id='password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder='Password'
                  required
                />

                <div className='level options'>
                  <a className='btn btn-link level-right' href=' '>
                    Forgot Password?
                  </a>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={this.onLogin}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { loginUser }
)(withRouter(Login));
