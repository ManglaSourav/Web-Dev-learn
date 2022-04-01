import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import jwtDecode from "jwt-decode";
const Button = styled.a`
  color: #ad8d67;
  background: #6e7880;
  margin-right: 1rem;
  border: 0;
  &:hover {
    background-color: #ad8d67;
    color: #6e7880;
  }
`;

function Header(props) {
  const [isActive, setActive] = useState(false);
  const isAuth = localStorage.getItem("jwtToken") ? true : false;

  const renderAddProperty = () => {
    if (localStorage.getItem("jwtToken")) {
      const decoded = jwtDecode(localStorage.getItem("jwtToken"));
      // console.log(decoded.type);
      if (decoded.type === "admin") {
        return (
          <Button
            className='button'
            onClick={e => {
              props.history.push({
                pathname: "/add",
                state: { to: "add" }
              });
            }}>
            Add Property
          </Button>
        );
      }
    }
  };
  return (
    <div>
      <nav
        className='navbar back'
        role='navigation'
        aria-label='main navigation'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='/'>
            <i className='far fa-building fa-2x' />{" "}
            <strong style={{ padding: "0.7rem" }}>Property Pro</strong>
          </a>
          <a
            onClick={() => setActive(!isActive)}
            role='button'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            href=' '>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>

        <div
          id='navbarBasicExample'
          className={isActive ? "navbar-menu is-active" : "navbar-menu"}>
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                {isAuth ? (
                  <span>
                    {renderAddProperty()}
                    <Button
                      className='button'
                      onClick={e => {
                        props.logoutUser(props.history);
                      }}>
                      Log out
                    </Button>
                  </span>
                ) : (
                  <span>
                    <Button
                      className='button'
                      onClick={() => {
                        props.history.push("/register");
                      }}>
                      Sign Up
                    </Button>
                    <Button
                      className='button'
                      onClick={() => {
                        props.history.push("/login");
                      }}>
                      Log in
                    </Button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default connect(
  null,
  { logoutUser }
)(withRouter(Header));
