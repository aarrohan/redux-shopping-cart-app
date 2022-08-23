// Functions
import { generateUID } from "../functions";

// Action Types
import {
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  EDIT_LIST_ITEM,
  ADD_CART_ITEM,
  INCREASE_CART_ITEM_QUANTITY,
  DECREASE_CART_ITEM_QUANTITY,
} from "./actionTypes";

// Initial State
const initialState = {
  listItems: [],
  cartItems: [],
};

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add List Item
    case ADD_LIST_ITEM:
      return {
        ...state,
        listItems: [
          ...state.listItems,
          {
            uid: generateUID(),
            image: action.payload.image,
            title: action.payload.title,
            price: action.payload.price,
            quantity: action.payload.quantity,
          },
        ],
      };

    // Remove List Item
    case REMOVE_LIST_ITEM:
      // Index of List Item
      const indexOfListItemToRemove = state.listItems
        .map((item) => item.uid)
        .indexOf(action.payload.uid);

      // Check if the List Item Exists in Cart Items
      const cartItemExistsToRemove = state.cartItems.some(
        (item) => item.listItemUID === action.payload.uid
      );

      if (cartItemExistsToRemove) {
        const indexOfCartItemExistsToRemove = state.cartItems
          .map((item) => item.listItemUID)
          .indexOf(action.payload.uid);

        return {
          ...state,
          listItems: [
            ...state.listItems.slice(0, indexOfListItemToRemove),
            ...state.listItems.slice(indexOfListItemToRemove + 1),
          ],
          cartItems: [
            ...state.cartItems.slice(0, indexOfCartItemExistsToRemove),
            ...state.cartItems.slice(indexOfCartItemExistsToRemove + 1),
          ],
        };

        // If the List Item doesn't Exist in Cart Items
      } else {
        return {
          ...state,
          listItems: [
            ...state.listItems.slice(0, indexOfListItemToRemove),
            ...state.listItems.slice(indexOfListItemToRemove + 1),
          ],
          cartItems: [...state.cartItems],
        };
      }

    // Edit List Item
    case EDIT_LIST_ITEM:
      return {
        ...state,
        listItems: [
          ...state.listItems.map((item) => {
            if (item.uid === action.payload.uid)
              return Object.assign({}, item, {
                ...item,
                image: action.payload.image,
                title: action.payload.title,
                price: action.payload.price,
                quantity: action.payload.quantity,
              });
            return item;
          }),
        ],
        cartItems: [...state.cartItems],
      };

    // Add Cart Item
    case ADD_CART_ITEM:
      // Check if the List Item Exists in Cart Items
      const cartItemExistsToAdd = state.cartItems.some(
        (item) => item.listItemUID === action.payload.listItemUID
      );

      if (cartItemExistsToAdd) {
        return state;

        // If the List Item doesn't Exist in Cart Items
      } else {
        return {
          ...state,
          listItems: [...state.listItems],
          cartItems: [
            ...state.cartItems,
            {
              listItemUID: action.payload.listItemUID,
              quantity: 1,
            },
          ],
        };
      }

    // Increase Cart Item Quantity
    case INCREASE_CART_ITEM_QUANTITY:
      // Index of List Item
      const indexOfListItemForCartItemToIncrease = state.listItems
        .map((item) => item.uid)
        .indexOf(action.payload.listItemUID);

      // Index of Cart Item
      const indexOfCartItemToIncrease = state.cartItems
        .map((item) => item.listItemUID)
        .indexOf(action.payload.listItemUID);

      return {
        ...state,
        listItems: [...state.listItems],
        cartItems: [
          ...state.cartItems.map((item, index) => {
            if (index === indexOfCartItemToIncrease)
              return Object.assign({}, item, {
                ...item,
                quantity:
                  item.quantity <=
                    parseInt(
                      state.listItems[indexOfListItemForCartItemToIncrease]
                        .quantity
                    ) &&
                  item.quantity + action.payload.value <
                    parseInt(
                      state.listItems[indexOfListItemForCartItemToIncrease]
                        .quantity
                    )
                    ? item.quantity + action.payload.value
                    : parseInt(
                        state.listItems[indexOfListItemForCartItemToIncrease]
                          .quantity
                      ),
              });
            return item;
          }),
        ],
      };

    // Decrease Cart Item Quantity
    case DECREASE_CART_ITEM_QUANTITY:
      // Index of Cart Item
      const indexOfCartItemToDecrease = state.cartItems
        .map((item) => item.listItemUID)
        .indexOf(action.payload.listItemUID);

      // Check if the Value is Greater than 1 else Remove the Item from Cart
      if (
        state.cartItems[indexOfCartItemToDecrease].quantity -
          action.payload.value <
        1
      ) {
        return {
          ...state,
          listItems: [...state.listItems],
          cartItems: [
            ...state.cartItems.slice(0, indexOfCartItemToDecrease),
            ...state.cartItems.slice(indexOfCartItemToDecrease + 1),
          ],
        };
      } else {
        return {
          ...state,
          listItems: [...state.listItems],
          cartItems: [
            ...state.cartItems.map((item, index) => {
              if (index === indexOfCartItemToDecrease)
                return Object.assign({}, item, {
                  ...item,
                  quantity:
                    item.quantity > 1 &&
                    item.quantity - action.payload.value > 1
                      ? item.quantity - action.payload.value
                      : 1,
                });
              return item;
            }),
          ],
        };
      }

    // Default
    default:
      return state;
  }
};

// Export
export default cartReducer;
