// components/SearchBar.jsx
import { useState } from "react";
import { motion } from "motion/react";
import Button from "./Button/Button";

export default function SearchBar({ placeholder = "Search... ", onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query); // 將搜尋字串回傳給父元件
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border rounded-md overflow-hidden">
      <input type="text" name="search-bar" value={query} onChange={handleInputChange} placeholder={placeholder} className="flex-1 px-4 py-2 outline-none" />
      <Button type="submit" variant="primary" size="md" className="rounded-l-none rounded-r-none">
        Search
      </Button>
    </form>
  );
}
