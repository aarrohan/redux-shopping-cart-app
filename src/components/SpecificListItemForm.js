import React, { useState } from "react";

const SpecificListItemForm = ({ specificItem, editSpecificListItem }) => {
  // States
  const [item, setItem] = useState(specificItem);

  // Functions
  const editListItemHandler = (e) => {
    e.preventDefault();
    editSpecificListItem(item);
  };

  return (
    <React.Fragment>
      <div className="add-list-item-form mb-8 w-[100%]">
        <form
          onSubmit={editListItemHandler}
          className="add-list-item-form-inner relative z-10 mb-2 w-[100%] py-3 pr-3 bg-slate-100 rounded-lg text-base font-normal text-center text-slate-900 dark:bg-slate-700 dark:text-slate-400 dark:highlight-white/10"
        >
          <input
            type="file"
            className="w-[100%] block px-5 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#38bdf8] file:text-white"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();

                reader.onload = function (res) {
                  setItem({
                    ...item,
                    image: res.target.result,
                  });
                };

                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />

          <input
            type="text"
            placeholder="Title"
            required
            className="w-[100%] px-5 text-white"
            value={item.title}
            onChange={(e) => {
              setItem({
                ...item,
                title: e.target.value,
              });
            }}
          />

          <input
            type="text"
            placeholder="Price"
            required
            className="w-[100%] px-5 text-white"
            value={item.price}
            onChange={(e) => {
              setItem({
                ...item,
                price: e.target.value,
              });
            }}
          />

          <input
            type="text"
            placeholder="Quantity"
            required
            className="w-[100%] px-5 pr-10 text-white"
            value={item.quantity}
            onChange={(e) => {
              setItem({
                ...item,
                quantity: e.target.value,
              });
            }}
          />

          <button className="relative z-10 w-[100%] py-2 bg-sky-500 rounded-lg text-sm font-medium text-center text-white dark:highlight-white/20">
            Save
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SpecificListItemForm;
