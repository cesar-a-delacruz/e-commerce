import { getUser } from "@utils/localstorage";
import * as actionTypes from "@constants/userContants";

export const initialize = () => async (dispatch) => {
  dispatch({ type: actionTypes.INITIAL });
};

export const setUser = () => async (dispatch) => {
  const user = getUser();
  if (!user) {
    return;
  }
  dispatch({
    type: actionTypes.SET,
    payload: {
      logged: true,
      details: { ...user },
    },
  });
};
