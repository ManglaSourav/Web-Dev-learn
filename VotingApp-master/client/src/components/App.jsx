import React, { Component } from "react";
import api from "../services/api";

export default class App extends Component {
  async componentDidMount() {
    const result = await api.call("post", "auth/login", {
      "username": "questions",
      "password": "question"
    });
    console.log(result);
  }
  render() {
    return <div>hello worlds</div>;
  }
}
