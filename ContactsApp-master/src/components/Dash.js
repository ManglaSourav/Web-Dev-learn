import React, { Component } from "react";
import axios from "axios";
import Nav from "./Navbar";
import Card from "./ContactCard";

export default class Dash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: "",
      loaded: false
    };
  }

  async componentDidMount() {
    await axios
      .get("/api/allContacts")
      .then(response => {
        this.setState({
          contacts: response.data,
          loaded: true
        });
        
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Nav history={this.props.history} />
        {this.state.loaded && this.state.contacts.map((contact, i) => (
          <Card key={i} history={this.props.history} contact={contact} />
        ))}
        {/* {this.map} */}
        {/* <Card history={this.props.history} />
        <Card history={this.props.history} />
        <Card history={this.props.history} /> */}
      </div>
    );
  }
}
