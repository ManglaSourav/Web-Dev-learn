import { SET_PRODUCTS, EDIT_PRODUCT } from "./types";
import productsData from "../../productsData.json";
import priceInfoData from "../../priceInfoData.json";
// import testData from "../../test.json";


export const fetchProducts = () => dispatch => {
  // console.log(testData);

  if (productsData && priceInfoData) {
    dispatch({
      type: SET_PRODUCTS,
      payload: { productsData, priceInfoData }
    });
  } else {
    console.log("Error in data loading");
  }
};

export const setEditedProduct = (editedData, allProduct) => dispatch => {
  allProduct[editedData.index].name = editedData.name;
  allProduct[editedData.index].weight = editedData.weight;
  allProduct[editedData.index].availability = editedData.availability;
  allProduct[editedData.index].productUrl = editedData.productUrl;
  allProduct[editedData.index].pricingTier = editedData.priceTier;
  allProduct[editedData.index].priceRange = editedData.priceRange;
  allProduct[editedData.index].isEditable = editedData.isEditable;

  dispatch({
    type: EDIT_PRODUCT,
    payload: allProduct
  });
};
