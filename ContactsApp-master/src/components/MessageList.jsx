import React, { Component } from "react";
import Nav from "./Navbar";
import axios from "axios";
import MessageCard from "./MessageCard";

export default class MessageList extends Component {
  state = {
    messages: []
  };
  componentDidMount() {
    axios.get("/api/getMessages").then(response =>
      this.setState({
        messages: response.data.reverse()
      })
    );
  }
  render() {
    return (
      <div className='container'>
        <Nav history={this.props.history} />
        {this.state.messages.map((data, i) => (
          <MessageCard key={i} history={this.props.history} data={data} />
        ))}
      </div>
    );
  }
}
