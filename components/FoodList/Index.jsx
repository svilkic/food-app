import React from "react";
import FoodCard from "./FoodCard";
import styles from "./foodList.module.css";

export default function FoodList({ products }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Full Food Menu</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>

      <div className={styles.wrapper}>
        {products.map(([key, value]) => (
          <>
            <h2 className={styles.categoryName}>{key}</h2>
            {value.map((product) => (
              <FoodCard key={product.id} id={product.id} data={product} />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
