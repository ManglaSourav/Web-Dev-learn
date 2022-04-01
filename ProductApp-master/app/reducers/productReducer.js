import { SET_PRODUCTS, EDIT_PRODUCT } from "../actions/types";

const initialState = {
  products: [],
  priceInfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      // console.log(action.payload.priceInfoData);
      return {
        ...state,
        products: action.payload.productsData,
        priceInfo: action.payload.priceInfoData
      };
    case EDIT_PRODUCT:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
