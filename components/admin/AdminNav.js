import Link from "next/link";
import React from "react";
import { useAuth } from "/util/AuthContext";
import styles from "./AdminNav.module.css";

export default function AdminNav() {
  const { logout, currentUser } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className={styles.container}>
      <Link href='/admin/products'> Products</Link>
      <Link href='/admin/orders'> Orders</Link>
      {currentUser && (
        <span className={styles.link} onClick={handleLogout}>
          Logout
        </span>
      )}
    </div>
  );
}
