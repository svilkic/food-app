import Image from "next/image";
import React from "react";
import styles from "/styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      Copyright - Aleksa Svilkic {new Date().getFullYear()} &#169;
    </div>
  );
}

export default Footer;
