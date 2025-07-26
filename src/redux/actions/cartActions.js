import * as actionTypes from "@constants/cartConstants";
import * as api from "@utils/api";
import { parseCart } from "@utils/helpers";
import { getUser } from "@utils/localstorage";

export const initialize = () => (dispatch) => {
  dispatch({ type: actionTypes.INITIAL });
};

export const fetchCart = () => async (dispatch) => {
  try {
    const user = getUser();
    if (user) {
      const { data } = await api.postRequest(`/api/cart/items`, {
        user_id: user.id,
      });
      const items = JSON.parse(data);
      dispatch({
        type: actionTypes.FETCH,
        payload: {
          items: parseCart(items),
        },
      });
    }
  } catch (error) {
    console.log("ERROR :  ", error);
    console.log("ERROR :  ", error);
  }
};

export const addToCart = (product_id, count) => async (dispatch) => {
  const { data } = await api.getRequest(`/api/products/${product_id}`);
  const product = JSON.parse(data);
  const insert_id = (
    await api.postRequest("/api/cart", {
      user_id: getUser().id,
      product_id,
      count,
    })
  ).data;

  dispatch({
    type: actionTypes.ADD,
    payload: {
      product: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      id: insert_id,
      count,
    },
  });
};

export const countEdit = (id, count) => async (dispatch) => {
  dispatch({
    type: actionTypes.ALTER_COUNT,
    payload: { id, count },
  });

  await api.putRequest("/api/cart", { id, count });
};

export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE,
    payload: id,
  });

  api.deleteRequest("/api/cart/" + id);
};
