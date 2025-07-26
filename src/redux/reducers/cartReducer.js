import * as actionTypes from "@constants/cartConstants";

const INITIAL_STATE = { items: [] };

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.INITIAL:
      return INITIAL_STATE;
    case actionTypes.FETCH:
      return { ...action.payload };
    case actionTypes.ADD:
      const item = action.payload;
      return {
        ...state,
        items: [...state.items, item],
      };
    case actionTypes.ALTER_COUNT:
      const selectedItem = action.payload;
      const existingItem = state.items.find((i) => i.id === selectedItem.id);

      return {
        ...state,
        items: state.items.map((i) => {
          if (i.id === existingItem.id) {
            i.count = existingItem.count;
            return i;
          } else return i;
        }),
      };
    case actionTypes.REMOVE:
      return {
        ...state,
        cartItems: state.items.filter((i) => i.product !== action.payload),
      };

    default:
      return state;
  }
};
