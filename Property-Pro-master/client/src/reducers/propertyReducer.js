import { GET_PROPERTY } from "../actions/types";

const initialState = {
  property: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTY:
      return {
        ...state,
        property: action.payload
      };
    default:
      return state;
  }
}
