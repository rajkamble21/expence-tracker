import React from "react";

const ExpenceForm = ({expenceModal, title, setTitle, price, setPrice, category, setCategory, date, setDate, addExpences, setExpenceModal}) => {
  return (
    <>
      {expenceModal && (
        <div className="modal">
          <div className="box">
            <h2>Add Expenses</h2>
            <div className="input-row">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-row">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
              </select>
              <input
                type="date"
                placeholder="dd/mm/yy"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="input-row">
              <button className="add" onClick={addExpences}>
                {" "}
                Add Expense{" "}
              </button>
              <button
                className="cancel"
                onClick={(e) => {
                  setExpenceModal(!expenceModal);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenceForm;
