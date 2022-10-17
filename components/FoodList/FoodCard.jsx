//LIBS
import React from "react";
import Image from "next/image";
import Link from "next/link";

// HELPERS
import { formatMoney } from "/util/helpers";

// CSS
import styles from "./foodCard.module.css";

export default function FoodCard({ id, data }) {
  const { img, name, prices, variants, description } = data;
  return (
    <Link href={`/product/${id}`}>
      <div className={styles.container}>
        <Image src={img} alt='pizza' width='80' height='80' />
        <div className={styles.details}>
          <div className={styles.titlePrice}>
            <h3 className={styles.title}>{name}</h3>
            <span className={styles.price}>
              {formatMoney(variants[0]?.price || prices[0])}
            </span>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  );
}
