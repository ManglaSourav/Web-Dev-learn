import React, { Component } from "react";

export default class MessageCard extends Component {
  render() {
    return (
      <div>
        <div className='card'>
          <div className='card-content'>
            <p className='title'>{this.props.data.name}</p>
            <p className='subtitle'>{this.props.data.message_data}</p>
          </div>
          <footer className='card-footer'>
            <p className='card-footer-item'>
              <span>{this.props.data.date.slice(11, 19)}</span>

              <span style={{ paddingLeft: "5px" }}>
                {this.props.data.date.slice(0, 10)}{" "}
              </span>
            </p>
          </footer>
        </div>
        <br />
      </div>
    );
  }
}
