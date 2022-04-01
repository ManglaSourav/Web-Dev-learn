import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
import Property from "./components/ViewProperty";
import "antd/dist/antd.css";
import AdminHandler from "./components/AdminHandler";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/property' component={Property} />
          <Route exact path='/add' component={AdminHandler} />
          <Route exact path='/edit' component={AdminHandler} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
