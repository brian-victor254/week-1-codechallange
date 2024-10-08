import React, { useState, useEffect } from "react";
import "./Transaction.css";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  useEffect(() => {
  
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (
      newTransaction.date &&
      newTransaction.description &&
      newTransaction.category &&
      newTransaction.amount
    ) {
      setTransactions([...transactions, newTransaction]);
      setNewTransaction({
        date: "",
        description: "",
        category: "",
        amount: "",
      });
    }
  };

  const filteredTransactions = searchTerm
    ? transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions;

  return (
  
    <div className="container">
      <div className="search-container">
        <form className="search-box">
          <div className="search-input-box">
            <input
              type="text"
              placeholder="Search your Recent Transactions"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
        </form>
      </div>

    
      <div id="submit-form">
        <form onSubmit={addTransaction} className="input-box">
          <div id="input-box">
            <input
              id="date"
              type="date"
              name="date"
              placeholder="Date"
              className="form-input"
              value={newTransaction.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-input"
              value={newTransaction.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="form-input"
              value={newTransaction.category}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="form-input"
              value={newTransaction.amount}
              onChange={handleInputChange}
            />
          </div>
      
          <div>
            <button type="submit" className="btn btn-primary">Add Transaction</button>
          </div>
        </form>
      </div>

  
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>Ksh {transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;