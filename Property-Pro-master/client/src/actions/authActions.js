import axios from "axios";
// import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => console.log(err));
};

// Login - Get User Token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      history.push("/");
    })
    .catch(err => console.log(err));
};

// Log user out
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  history.push("/");
};
