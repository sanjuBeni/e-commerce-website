import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  // console.log(action);
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        products: action.payload.products,
        productsCount: action.payload.productCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
