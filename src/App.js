import React, { useEffect, useState } from "react";

// Dependencies
import { useDispatch, useSelector } from "react-redux";

// Components
import AddListItemForm from "./components/AddListItemForm";
import SpecificListItemForm from "./components/SpecificListItemForm";
import ListItem from "./components/ListItem";
import CartItem from "./components/CartItem";

// Actions
import {
  addListItem,
  removeListItem,
  editListItem,
  addCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "./redux/cart/actions";

const App = () => {
  // Dispatch & States
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  // States
  const [specificListItem, setSpecificListItem] = useState({
    opened: false,
    item: null,
  });
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  // Detect Total Items
  useEffect(() => {
    let totalCartItemsNum = 0;
    let subTotalNum = 0;

    cartState.cartItems.map((item) => {
      totalCartItemsNum += parseInt(item.quantity);

      const indexOfListItem = cartState.listItems
        .map((item) => item.uid)
        .indexOf(item.listItemUID);

      subTotalNum +=
        parseInt(cartState.listItems[indexOfListItem].price) *
        parseInt(item.quantity);
    });

    setTotalCartItems(totalCartItemsNum);
    setSubTotal(subTotalNum);
  }, [cartState.cartItems]);

  // Functions
  const openSpecificListItem = (uid) => {
    setSpecificListItem({
      ...specificListItem,
      opened: true,
      item: cartState.listItems.find((item) => item.uid === uid),
    });
  };

  const editSpecificListItem = (updatedItem) => {
    dispatch(
      editListItem({
        ...updatedItem,
      })
    );

    setSpecificListItem({
      ...specificListItem,
      opened: false,
      item: null,
    });
  };

  return (
    <React.Fragment>
      <section className="hero">
        <div className="min-h-[100vh] container py-20 mx-auto flex flex-col justify-center items-center">
          <h1 className="relative z-10 mb-20 text-4xl font-bold text-center text-white">
            Redux Shopping Cart
            <br />
            <span className="text-[#38bdf8]">Application</span>
          </h1>

          <div className="hero-content w-[100%]">
            <div className="l-items w-[100%] p-10 dark:bg-slate-800/50 rounded-lg">
              {specificListItem.opened ? (
                <SpecificListItemForm
                  specificItem={specificListItem.item}
                  editSpecificListItem={editSpecificListItem}
                />
              ) : (
                <AddListItemForm
                  redux={{ dispatch, actions: { addListItem } }}
                />
              )}

              {cartState.listItems.length > 0 ? (
                cartState.listItems.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      redux={{
                        dispatch,
                        cartState,
                        actions: { removeListItem, addCartItem },
                      }}
                      item={item}
                      specificListItem={specificListItem}
                      openSpecificListItem={openSpecificListItem}
                    />
                  );
                })
              ) : (
                <p className="text-xs text-center text-slate-100/40">
                  Nothing to show...
                </p>
              )}
            </div>

            <div className="cart-items w-[100%] p-10 dark:bg-slate-800/50 rounded-lg">
              {cartState.cartItems.length > 0 ? (
                <React.Fragment>
                  {cartState.cartItems.map((item, index) => {
                    return (
                      <CartItem
                        key={index}
                        redux={{
                          dispatch,
                          cartState,
                          actions: {
                            increaseCartItemQuantity,
                            decreaseCartItemQuantity,
                          },
                        }}
                        item={{
                          ...item,
                          index,
                        }}
                      />
                    );
                  })}

                  <div className="mb-[25px] flex justify-between">
                    <h3 className="relative z-10 text-sm font-semibold text-white">
                      Total Items
                    </h3>
                    <h3 className="relative z-10 text-sm font-semibold text-white">
                      {totalCartItems}
                    </h3>
                  </div>

                  <div className="mb-[25px] flex justify-between">
                    <h3 className="relative z-10 text-sm font-medium text-white">
                      Sub Total
                    </h3>
                    <h3 className="relative z-10 text-sm font-medium text-white">
                      ${subTotal}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                    className="relative z-10 w-[100%] py-3 bg-sky-500 rounded-lg text-sm font-medium text-center text-white dark:highlight-white/20"
                  >
                    Continue to Checkout
                  </button>
                </React.Fragment>
              ) : (
                <p className="text-xs text-center text-slate-100/40">
                  Nothing to show...
                </p>
              )}
            </div>
          </div>

          <div className="absolute left-[28%] top-28 pointer-events-none hidden rotate-12 rounded-3xl bg-sky-800 opacity-90 blur-3xl filter dark:opacity-30 lg:h-32 lg:w-[450px] dark:lg:block xl:h-44 xl:w-[600px]"></div>

          <div className="absolute right-[28%] top-0 pointer-events-none hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:-right-20 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>

          <div className="absolute bottom-44 -left-64 pointer-events-none hidden h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30 blur-3xl filter dark:block lg:bottom-24 lg:-left-20 lg:h-28 lg:w-[250px] lg:-rotate-12 lg:opacity-20 xl:h-40 xl:w-[400px]"></div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default App;
