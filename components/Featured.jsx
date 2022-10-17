import Image from "next/image";
import React, { useEffect, useReducer } from "react";
import styles from "/styles/Featured.module.css";

const images = ["/img/featured.jpg", "/img/featured.jpg", "/img/featured.jpg"];

function Featured() {
  const [index, setIndex] = useReducer((prev, side) => {
    if (side === "r") return prev + 1 > images.length - 1 ? 0 : prev + 1;
    else return prev - 1 < 0 ? images.length - 1 : prev - 1;
  }, 0);

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        onClick={() => setIndex("l")}
        style={{ left: 0 }}
      >
        <Image src='/img/arrowl.png' alt='arrow-left' layout='fill' />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((url, i) => (
          <div key={i} className={styles.imgContainer}>
            <Image src={url} alt='featured-img' layout='fill' />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        onClick={() => setIndex("r")}
        style={{ right: 0 }}
      >
        <Image src='/img/arrowr.png' alt='arrow-right' layout='fill' />
      </div>
    </div>
  );
}

export default Featured;
