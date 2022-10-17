import React, { useState } from "react";
import { useSelector } from "react-redux";

// NEXT LIBS
import Image from "next/image";
import Link from "next/link";

// CSS
import styles from "./Navbar.module.css";

// CONTEXT
import { useAuth } from "/util/AuthContext";

function Navbar() {
  const { currentUser } = useAuth();
  const { quantity } = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        {/* CALL BTN OR LOGO */}
        <div className={styles.call}>
          {/* <span>
            <Link href='/admin/login'>
              <Image src='/img/logo.png' alt='' width='160px' height='69px' />
            </Link>
          </span> */}
          <div className={styles.callButton}>
            <Image
              src='/img/telephone.png'
              alt='phone'
              width='32px'
              height='32px'
            />
          </div>
          <div className={styles.texts}>
            <p className={styles.text}>ORDER NOW!</p>
            <a className={styles.text} href='tel:012345678'>
              +381 65 305 305
            </a>
          </div>
        </div>
      </div>
      {/* OPTION ITEMS */}
      <div className={styles.options}>
        {/* NAVIGATION */}
        <div className={`${styles.navigation} ${show ? styles.show : ""}`}>
          <ul className={styles.list}>
            <li className={styles.listItem} onClick={() => setShow(false)}>
              <Link href='/'>Homepage</Link>
            </li>
            <li className={styles.listItem} onClick={() => setShow(false)}>
              <Link href='/menu'>Menu</Link>
            </li>
            {/* <span>
            <Link href='/admin/login'>
              <Image src='/img/logo.png' alt='' width='160px' height='69px' />
            </Link>
          </span> */}
            <li className={styles.listItem} onClick={() => setShow(false)}>
              <Link href='/contact'>Contact</Link>
            </li>
            {currentUser && (
              <li
                className={`${styles.listItem}`}
                onClick={() => setShow(false)}
              >
                <Link href='/admin'>Admin</Link>
              </li>
            )}
          </ul>
        </div>
        <Link href='/cart'>
          <div className={styles.cart}>
            <Image src='/img/cart.png' alt='' width='30px' height='30px' />
            <span className={styles.counter}>{quantity}</span>
          </div>
        </Link>
        <div
          className={`${styles.hamburger} ${show ? styles.active : ""}`}
          onClick={() => setShow((prev) => !prev)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
