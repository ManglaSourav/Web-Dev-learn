import React from "react";
import "./App.css";
import Home from "./components/Dash";
import View from "./components/ViewContact";
import SendMessage from "./components/sendMessage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MessageList from "./components/MessageList";

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/contactDisplay' component={View} />
        <Route exact path='/sendText' component={SendMessage} />
        <Route exact path='/messagesList' component={MessageList} />
      </Router>
    </div>
  );
}

export default App;
