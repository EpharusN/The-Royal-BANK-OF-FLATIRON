import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import Filter from "./components/Filter";
import TransactionTable from "./components/TransactionTable";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/transactions?description_like=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.log(error));
  }, [searchTerm]);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleFilter = (searchTerm) => {
    // console.log(searchTerm);
    let filtered = transactions.filter((t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //console.log("found", filtered);
    setFilteredTransactions(filtered);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <h3>The Royal Bank of Flatiron</h3>
      <Filter handleFilter={handleFilter} />
      <Form onAddTransaction={handleAddTransaction} />
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default App;
