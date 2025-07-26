import * as actionTypes from "@constants/userContants";

export const INITIAL_STATE = {
  logged: false,
  details: {},
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INITIAL:
      return INITIAL_STATE;
    case actionTypes.SET:
      return { ...action.payload };

    default:
      return state;
  }
};
