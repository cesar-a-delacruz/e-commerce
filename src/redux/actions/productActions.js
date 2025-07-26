import * as actionTypes from "@constants/productConstants";
import * as api from "@utils/api";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ALL });
    const { data } = await api.getRequest("/api/products");

    dispatch({
      type: actionTypes.GET_ALL_SUCCESS,
      payload: JSON.parse(data),
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_FAIL,
      payload: error,
    });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ONE });
    const { data } = await api.getRequest(`/api/products/${id}`);

    dispatch({
      type: actionTypes.GET_ONE_SUCCESS,
      payload: JSON.parse(data),
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_FAIL,
      payload: error,
    });
  }
};

export const removeProduct = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE,
    payload: id,
  });

  api.deleteRequest("/api/products/" + id);
};
