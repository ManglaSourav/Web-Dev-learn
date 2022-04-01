import axios from "axios";

import { GET_PROPERTY } from "./types";

// Get current property
export const getAllProperty = () => dispatch => {
  axios
    .get("/api/property")
    .then(res => {
      dispatch({
        type: GET_PROPERTY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Create Property
export const createProperties = (propertyData, history) => dispatch => {
  axios
    .post("/api/property/create", propertyData)
    .then(res => history.push("/"))
    .catch(err => console.log(err));
};

// edit Property
export const editProperty = (editedProperty, id, history) => dispatch => {
  axios
    .post(`/api/property/edit/${id}`, editedProperty)
    .then(res => history.push("/"))
    .catch(err => console.log(err));
};
