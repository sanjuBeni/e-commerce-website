import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      const { data } = await axios.get("http://localhost:5000/api/v1/products");
      // console.log(data);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload:
          error.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const clearError = async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
