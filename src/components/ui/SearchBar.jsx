// components/SearchBar.jsx
import { useState } from "react";
import { motion } from "motion/react";

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
    <form
      onSubmit={handleSubmit}
      className="flex items-center border rounded-md overflow-hidden"
    >
      <input
        type="text"
        name="search-bar"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 outline-none"
      />
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        type="submit"
        className="bg-primary text-white hover:bg-primary-dark px-4 py-2"
      >
        Search
      </motion.button>
    </form>
  );
}
