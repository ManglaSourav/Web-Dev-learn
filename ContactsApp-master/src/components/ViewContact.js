// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Nav from "./Navbar";
import React, { Component } from "react";

export default class viewContact extends Component {
  sendMessage = () => {
    this.props.history.push({
      pathname: "/sendText",
      state: { contact: this.props.location.state.contact }
    });
  };
  render() {
    return (
      <div className='container'>
        <Nav history={this.props.history} />
        <div className='ss'>
          <div className='card cardCon'>
            <div className='card-content'>
              <div style={{ textAlign: "center" }}>
                <label className='label'>
                  {this.props.location.state.contact.name}
                </label>
                <label className='label'>
                  {this.props.location.state.contact.mobileNumber}
                </label>
                <button
                  onClick={this.sendMessage}
                  className='button is-primary'>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
