import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Date </label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <label htmlFor="description">Description </label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <label htmlFor="category">Category </label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        placeholder="Category"
        onChange={handleChange}
      />
      <label htmlFor="amount">Amount </label>
      <input
        type="text"
        id="amount"
        name="amount"
        value={formData.amount}
        placeholder="Amount"
        onChange={handleChange}
      />
      <button className="btn btn-primary" type="submit">
        Add Transaction
      </button>
    </form>
  );
}

export default Form;
