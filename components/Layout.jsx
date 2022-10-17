import React from "react";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
