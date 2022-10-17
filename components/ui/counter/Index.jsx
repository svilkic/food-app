import React from "react";
import styles from "./counter.module.css";

export default function Counter({ value, onChange }) {
  const handleDecrement = () => {
    if (value - 1 > 0) onChange(value - 1);
  };
  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <span className={styles.container}>
      <button className={styles.button} onClick={handleDecrement}>
        -
      </button>
      <input
        className={styles.counter}
        type='number'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled
        min={1}
      />
      <button className={styles.button} onClick={handleIncrement}>
        +
      </button>
    </span>
  );
}
