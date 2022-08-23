import React, { useEffect, useState } from "react";

const CartItem = ({ redux, item }) => {
  // States
  const [cartItem, setCartItem] = useState({
    title: null,
    price: null,
    inStock: null,
    quantity: null,
  });

  useEffect(() => {
    const listItemIndex = redux.cartState.listItems
      .map((item) => item.uid)
      .indexOf(item.listItemUID);

    setCartItem({
      ...cartItem,
      title: redux.cartState.listItems[listItemIndex].title,
      price: redux.cartState.listItems[listItemIndex].price,
      inStock: redux.cartState.listItems[listItemIndex].quantity,
      quantity: item.quantity,
    });
  }, [redux.cartState]);

  return (
    <React.Fragment>
      <div className="cart-item flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="relative z-10 text-lg font-semibold text-white">
            {cartItem.title}
          </h3>
          <p className="mb-3 text-sm font-medium text-[#38bdf8]">
            Total: ${parseInt(cartItem.price) * parseInt(cartItem.quantity)}{" "}
            <span className="text-xs text-slate-100/40">
              (${cartItem.price}x{cartItem.quantity})
            </span>
          </p>
        </div>

        <div className="flex items-center">
          <button
            className="relative z-10 mr-2 w-[30px] h-[30px] pb-[2px] bg-red-500 rounded-full text-base text-center text-white dark:highlight-white/20"
            onClick={() => {
              redux.dispatch(
                redux.actions.decreaseCartItemQuantity({
                  listItemUID: item.listItemUID,
                  value: 1,
                })
              );
            }}
          >
            -
          </button>

          <span className="relative z-10 text-lg font-medium text-white">
            {cartItem.quantity}
          </span>

          <button
            className="relative z-10 ml-2 w-[30px] h-[30px] pb-[2px] bg-sky-500 rounded-full text-base text-center text-white dark:highlight-white/20"
            onClick={() => {
              redux.dispatch(
                redux.actions.increaseCartItemQuantity({
                  listItemUID: item.listItemUID,
                  value: 1,
                })
              );
            }}
          >
            +
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItem;
