// LIBS
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  query,
  getDocs,
  onSnapshot,
  where,
} from "firebase/firestore";
// HELPERS
import { groupBy } from "./helpers";
// FIREBASE
import { auth, db } from "./firebase.config";
import { useRouter } from "next/router";
import Link from "next/link";

const OrderContext = React.createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(collection(db, "orders"), where("status", "==", 0));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          // docs.push(doc.data());
          toast.success(
            <>
              <span>New orders!</span>&nbsp;
              <u>
                <Link href='/admin/orders'>Orders</Link>
              </u>
            </>,
            {
              position: "top-center",
              autoClose: false,
            }
          );
        });
        setOrders(docs);
      });
    }
  }, []);

  const value = {
    orders,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
