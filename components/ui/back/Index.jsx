import React from "react";
import { Router, useRouter } from "next/router";
import styles from "./back.module.css";
import { IoCaretBackOutline } from "react-icons/io5";

export default function Back() {
  const router = useRouter();
  return (
    <button className={styles.back} type='button' onClick={() => router.back()}>
      <IoCaretBackOutline size='1.6rem' title='Go back' />
    </button>
  );
}
