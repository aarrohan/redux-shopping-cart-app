// Action Types
import {
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  EDIT_LIST_ITEM,
  ADD_CART_ITEM,
  INCREASE_CART_ITEM_QUANTITY,
  DECREASE_CART_ITEM_QUANTITY,
} from "./actionTypes";

// Actions
const addListItem = (payload) => {
  return {
    type: ADD_LIST_ITEM,
    payload,
  };
};

const removeListItem = (payload) => {
  return {
    type: REMOVE_LIST_ITEM,
    payload,
  };
};

const editListItem = (payload) => {
  return {
    type: EDIT_LIST_ITEM,
    payload,
  };
};

const addCartItem = (payload) => {
  return {
    type: ADD_CART_ITEM,
    payload,
  };
};

const increaseCartItemQuantity = (payload) => {
  return {
    type: INCREASE_CART_ITEM_QUANTITY,
    payload,
  };
};

const decreaseCartItemQuantity = (payload) => {
  return {
    type: DECREASE_CART_ITEM_QUANTITY,
    payload,
  };
};

// Export
export {
  addListItem,
  removeListItem,
  editListItem,
  addCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
};
