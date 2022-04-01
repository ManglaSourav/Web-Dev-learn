import React from "react";
import "./index.css";
import DisplayData from "./components/DisplayData";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav
            className='navbar navbar-dark '
            style={{ backgroundColor: "#3b5999" }}>
            <a href='/'>
              <h2>Product App</h2>
            </a>
          </nav>
          <Route exact path='/' component={DisplayData} />
          <Route exact path='/edit-product' component={EditProduct} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
