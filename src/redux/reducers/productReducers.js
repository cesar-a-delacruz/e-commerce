import * as actionTypes from "@constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL:
      return {
        products: [],
        loading: true,
      };
    case actionTypes.GET_ALL_SUCCESS:
      return {
        products: [...action.payload],
        loading: false,
      };
    case actionTypes.GET_ALL_FAIL:
      return {
        error: action.payload,
      };
    case actionTypes.REMOVE:
      return {
        products: state.products.filter((p) => p.id !== action.payload),
      };

    default:
      return state;
  }
};

export const productReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_ONE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ONE_SUCCESS:
      return {
        loading: false,
        product: { ...action.payload },
      };
    case actionTypes.GET_ONE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
