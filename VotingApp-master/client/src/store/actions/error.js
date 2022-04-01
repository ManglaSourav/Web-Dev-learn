import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export const addError = () => ({
  type: ADD_ERROR,
  error
});
export const removedError = () => ({
  type: REMOVE_ERROR
});
