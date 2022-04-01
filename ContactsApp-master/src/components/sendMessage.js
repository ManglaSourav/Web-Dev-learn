import React, { Component } from "react";
import Nav from "./Navbar";
import axios from "axios";
export default class sendMessage extends Component {
  state = {
    name: this.props.location.state.contact.name,
    mobileNumber: this.props.location.state.contact.mobileNumber,
    msg: `Hi. Your OTP is: ${Math.floor(100000 + Math.random() * 900000)}`
  };

  //send data to backend
  sendMsg = event => {
    event.preventDefault();
    const new_msg = {
      name: this.state.name,
      mobileNumber: this.state.mobileNumber,
      msg: this.state.msg
    };
    
    axios
      .post("/api/sendOTP", new_msg)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Nav history={this.props.history} />
        <div style={{ marginLeft: "35%" }}>
          <div
            className='card'
            style={{
              textAlign: "center",
              width: "30rem"
            }}>
            <p className='title'>Compose Message</p>
            <div className='card-content'>
              <div className='field is-horizontal'>
                <div className='field-label is-normal'>
                  <label className='label'>To </label>
                </div>{" "}
                <input
                  className='input'
                  type='text'
                  value={this.state.mobileNumber}
                  onChange={() => {}}
                />
              </div>
              <div className='field is-horizontal'>
                <div className='field-label is-normal'>
                  <label className='label'>Message </label>
                </div>
                <input
                  className='input'
                  type='text'
                  value={this.state.msg}
                  onChange={() => {}}
                />
              </div>
              <a href=' ' className='button is-primary' onClick={this.sendMsg}>
                Send
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
