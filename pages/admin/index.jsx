import React from "react";
import AdminNav from "../../components/admin/AdminNav";
// CSS
import styles from "/styles/Admin.module.css";

export default function Index({ products, orders }) {
  return (
    <div className={styles.container}>
      <AdminNav />
    </div>
  );
}
