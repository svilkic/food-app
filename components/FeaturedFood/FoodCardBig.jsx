//LIBS
import React from "react";
import Image from "next/image";
import Link from "next/link";

// HELPERS
import { formatMoney } from "/util/helpers";

// CSS
import styles from "./foodCardBig.module.css";

export default function FoodCardBig({ id, data }) {
  const { img, name, prices, variants, description } = data;
  return (
    <Link href={`/product/${id}`}>
      <div className={styles.container}>
        <Image src={img} alt='pizza' width='500' height='500' />
        <h2 className={styles.title}>{name}</h2>
        <span className={styles.price}>
          {formatMoney(variants[0]?.price || prices[0])}
        </span>
        {/* <p className={styles.description}>{description}</p> */}
      </div>
    </Link>
  );
}
