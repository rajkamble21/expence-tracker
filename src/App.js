import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PieChart from "./Components/MyPieChart";
import HorizontalBarChartComponent from "./Components/HorizontalBarChartComponent";
import Trasanction from "./Components/Trasanction";
import { useSnackbar } from "notistack";

import "./App.css";

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [editId, setEditId] = useState(null);

  const [balanceModal, setBalanceModal] = useState(false);
  const [expenceModal, setExpenceModal] = useState(false);
  const [editExpenceModal, setEditExpenceModal] = useState(false);

  const [expenceList, setExpenceList] = useState([]);

  const [balance, setBalance] = useState(5000);
  const [expence, setExpence] = useState(0);

  const [incomeAmount, setIncomeAmount] = useState(null);

  const addBalance = () => {
    let update = balance + parseInt(incomeAmount);
    setBalance(update);
    setIncomeAmount("");
    setBalanceModal(!balanceModal);
    localStorage.setItem("balance", update);
  };

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const addExpences = () => {
    const id = uuidv4();
    const newExpense = {
      id: id,
      title: title,
      price: price,
      category: category,
      date: date,
    };

    let updateExpence = expence + parseInt(price);
    let updateBalance = balance - parseInt(price);

    if (updateBalance < 0) {
      enqueueSnackbar("Do not have balance", { variant: "error" });
      setExpenceModal(!expenceModal);
      return;
    }

    setExpence(updateExpence);
    setBalance(updateBalance);

    setExpenceList([...expenceList, newExpense]);

    setTitle("");
    setPrice("");
    setCategory("Food");
    setDate("");
    setExpenceModal(!expenceModal);
    localStorage.setItem("expence", updateExpence);
    localStorage.setItem("balance", updateBalance);
    localStorage.setItem(
      "expenceList",
      JSON.stringify([...expenceList, newExpense])
    );
  };

  const removeExpences = (itemId) => {
    const expenseToRemove = expenceList.find(
      (expense) => expense.id === itemId
    );

    const updatedExpenseTotal = expence - parseInt(expenseToRemove.price);
    const updatedBalance = balance + parseInt(expenseToRemove.price);

    const updatedExpenses = expenceList.filter(
      (expense) => expense.id !== itemId
    );

    setExpence(updatedExpenseTotal);
    setBalance(updatedBalance);
    setExpenceList(updatedExpenses);

    localStorage.setItem("expence", updatedExpenseTotal);
    localStorage.setItem("balance", updatedBalance);
    localStorage.setItem("expenceList", JSON.stringify(updatedExpenses));
  };

  const editExpense = (itemId) => {
    setEditId(itemId);
    const expenseToEdit = expenceList.find((expense) => expense.id === itemId);
    setEditExpenceModal(!editExpenceModal);
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setPrice(expenseToEdit.price);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    }
  };

  const updateExpence = () => {
    const index = expenceList.findIndex((expense) => expense.id === editId);
    if (index !== -1) {
      const priceDifference =
        parseInt(price) - parseInt(expenceList[index].price);

      const updatedExpenceTotal = expence + priceDifference;
      const updatedBalance = balance - priceDifference;

      setExpence(updatedExpenceTotal);
      setBalance(updatedBalance);

      const updatedExpenceList = [...expenceList];
      updatedExpenceList[index] = {
        ...updatedExpenceList[index],
        title: title,
        price: price,
        category: category,
        date: date,
      };
      setExpenceList(updatedExpenceList);

      setEditExpenceModal(!editExpenceModal);
      setTitle("");
      setPrice("");
      setCategory("Food");
      setDate("");

      localStorage.setItem("expenceList", JSON.stringify(updatedExpenceList));
      localStorage.setItem("expence", updatedExpenceTotal);
      localStorage.setItem("balance", updatedBalance);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("balance")) {
      setBalance(parseInt(localStorage.getItem("balance")));
    }
    if (localStorage.getItem("expence")) {
      setExpence(parseInt(localStorage.getItem("expence")));
    }
    if (localStorage.getItem("expenceList")) {
      setExpenceList(JSON.parse(localStorage.getItem("expenceList")));
    }
  }, []);

  useEffect(() => {
    console.log(expenceList);
  });

  return (
    <>
      <div className="App">
        <h1>Expense Tracker</h1>
        <div className="container">
          <div className="row-1">
            <div className="balance">
              <h2>
                Wallet Balance: <span>₹{balance}</span>
              </h2>
              <button
                className="add-income"
                onClick={(e) => {
                  setBalanceModal(!balanceModal);
                }}
              >
                {" "}
                + Add income
              </button>
            </div>
            <div className="expence">
              <h2>
                Expenses: <span>₹{expence}</span>
              </h2>
              <button
                className="add-expence"
                onClick={(e) => {
                  setExpenceModal(!expenceModal);
                }}
              >
                {" "}
                + Add expence
              </button>
            </div>
            <div className="piechart">
              <PieChart data={expenceList} />
            </div>
          </div>

          <div className="row-2">
            <div className="transactions">
              <h2>Recent Transactions</h2>
              <div className="list">
                <Trasanction
                  data={expenceList}
                  removeExpences={removeExpences}
                  editExpense={editExpense}
                />
              </div>
            </div>
            <div className="top-expenses">
              <h2>Top Expenses</h2>
              <div className="barchart">
                {<HorizontalBarChartComponent data={expenceList} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {balanceModal && (
        <div className="modal">
          <div className="box">
            <h2>Income Amount</h2>
            <div className="input-row">
              <input
                type="text"
                placeholder="income amount"
                value={incomeAmount}
                onChange={(e) => {
                  setIncomeAmount(e.target.value);
                }}
              />
              <button
                className="add"
                onClick={(e) => {
                  addBalance();
                }}
              >
                {" "}
                Add Income{" "}
              </button>
              <button
                className="cancel"
                onClick={(e) => {
                  setBalanceModal(!balanceModal);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

      {editExpenceModal && (
        <div className="modal">
          <div className="box">
            <h2>Edit Expenses</h2>
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
              <button className="add" onClick={updateExpence}>
                {" "}
                Edit Expense{" "}
              </button>
              <button
                className="cancel"
                onClick={(e) => {
                  setEditExpenceModal(!editExpenceModal);
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
}

export default App;
