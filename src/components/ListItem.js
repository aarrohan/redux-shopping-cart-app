import React, { useEffect, useState } from "react";

const ListItem = ({ redux, item, specificListItem, openSpecificListItem }) => {
  // States
  const [existsInCartItems, setExistsInCartItems] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  useEffect(() => {
    const itemExistsInCartItems = redux.cartState.cartItems.some(
      (cartItem) => cartItem.listItemUID === item.uid
    );

    if (itemExistsInCartItems) {
      setExistsInCartItems(true);

      const cartItemIndex = redux.cartState.cartItems
        .map((item) => item.listItemUID)
        .indexOf(item.uid);

      if (
        parseInt(item.quantity) ===
        redux.cartState.cartItems[cartItemIndex].quantity
      ) {
        setOutOfStock(true);
      } else {
        setOutOfStock(false);
      }
    } else {
      setExistsInCartItems(false);
    }
  }, [redux.cartState.cartItems]);

  return (
    <React.Fragment>
      <div className="l-item flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={item.image}
            alt=""
            className="relative z-10 mr-[25px] w-[100px] h-[100px] object-cover	rounded-full border-[5px] border-slate-100/10"
          />

          <div className="flex flex-col">
            <h3 className="relative z-10 text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="mb-3 text-sm font-medium text-[#38bdf8]">
              Price: ${item.price}
            </p>

            <p className="text-xs text-slate-100/40">
              In stock: {item.quantity}
            </p>
          </div>
        </div>

        {!specificListItem.opened ? (
          <div className="flex">
            <button
              className="relative z-10 rotate-45 mr-1 w-[30px] h-[30px] pb-[2px] bg-red-500 rounded-full text-base text-center text-white dark:highlight-white/20"
              onClick={() => {
                redux.dispatch(
                  redux.actions.removeListItem({
                    uid: item.uid,
                  })
                );
              }}
            >
              +
            </button>

            {!existsInCartItems ? (
              <button
                className="relative z-10 mr-1 w-[30px] h-[30px] pb-[2px] bg-sky-500 rounded-full text-base text-center text-white dark:highlight-white/20"
                onClick={() => {
                  redux.dispatch(
                    redux.actions.addCartItem({
                      listItemUID: item.uid,
                    })
                  );
                }}
              >
                +
              </button>
            ) : null}

            <button
              className="relative z-10 rotate-[35deg] w-[30px] h-[30px] pb-[2px] bg-green-500 rounded-full text-base text-center text-white dark:highlight-white/20"
              onClick={() => {
                openSpecificListItem(item.uid);
              }}
            >
              !
            </button>

            {existsInCartItems && outOfStock ? (
              <div className="relative z-10 ml-1 flex items-center h-[30px] px-3 bg-red-500 rounded-full text-sm text-center text-white dark:highlight-white/20">
                Out of Stock
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default ListItem;
