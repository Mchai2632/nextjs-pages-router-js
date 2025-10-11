import React from "react";

export default function Form({ data, handleInputChange }) {
  return (
    <form className="border-1 p-2">
      <div>
        <label htmlFor="name">name: </label>
        <input
          id="name"
          type="text"
          name="name"
          value={data.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">email: </label>
        <input
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phone">phone: </label>
        <input
          id="phone"
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="amount">amount: </label>
        <input
          id="amount"
          type="text"
          name="amount"
          value={data.amount}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}
