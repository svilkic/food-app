import React from "react";
import FoodCardBig from "./FoodCardBig";
import styles from "./featuredFood.module.css";

export default function FeaturedFoodList({ products }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Featured Food products</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div className={styles.wrapper}>
        {products.map((product) => (
          <FoodCardBig key={product.id} id={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}
