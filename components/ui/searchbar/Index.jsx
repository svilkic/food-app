import React, { useEffect, useState } from "react";
import styles from "./searchbarstyle.module.css";
import { categories } from "/constants";

export default function SearchBar() {
  const [search, setSearch] = useState({
    title: "",
    category: "",
    price: 0,
  });

  const handleSearch = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, setSearch]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        id='title'
        type='text'
        onChange={handleSearch}
        value={search.title}
        placeholder='title'
      />
      <select id='category' className={styles.input}>
        <option>All Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        className={styles.input}
        id='price'
        type='number'
        onChange={handleSearch}
        value={search.price}
        placeholder='price'
      />
    </div>
  );
}
