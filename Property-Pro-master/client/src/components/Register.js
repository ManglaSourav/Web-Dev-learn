import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSignUp = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div id='login'>
        <div className='login-card'>
          <div className='card-title'>
            <h1>Please Sign Up</h1>
          </div>

          <div className='content'>
            <form>
              <input
                id='name'
                type='text'
                name='name'
                value={this.state.name}
                onChange={this.onChange}
                placeholder='Name'
                required
              />
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
              <input
                id='password'
                type='password'
                name='password2'
                value={this.state.password2}
                onChange={this.onChange}
                placeholder='Confirm Password'
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
                onClick={this.onSignUp}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null,
  { registerUser }
)(withRouter(Register));
