// REACT
import React, { useEffect, useState } from "react";
import AdminNav from "/components/admin/AdminNav";
import Link from "next/link";
import { useRouter } from "next/router";
// UTIL
import { useAuth } from "/util/AuthContext";
import { getAllOrders, updateOrderStatus } from "/util/firebase.config";
import { useOrders } from "/util/OrderContext";
// CONSTANTS
import { stages } from "/constants";
// CSS
import classes from "/styles/Admin.module.css";
import SearchBar from "../../components/ui/searchBar/Index";

export default function Orders({ orders }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [orderList, setOrderList] = useState(orders);

  const handleStatusChange = async (orderId, newStatus) => {
    let order = orderList.find((o) => o.id === orderId);

    const res = await updateOrderStatus(orderId, parseInt(newStatus));
    if (res) {
      let updatedList = [...orderList];
      let uOrder = updatedList.find((o) => o.id === orderId);
      uOrder.status = parseInt(newStatus);
      setOrderList(updatedList);
    } else {
      console.error("Couln't update state");
    }
  };

  useEffect(() => {
    if (!currentUser) router.push("/");
  }, []);

  if (currentUser)
    return (
      <>
        <div className={classes.container}>
          <AdminNav />
          <div className={classes.item}>
            <h1>Orders</h1>
            <SearchBar />
            <table className={classes.table}>
              <tbody>
                <tr className={classes.trTitle}>
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </tbody>
              {orderList.map((order) => (
                <tbody key={order.id}>
                  <tr className={classes.trTitle}>
                    <td>
                      <Link href={`/order/${order.id}`}>{order.id}</Link>
                    </td>
                    <td>{order.customer}</td>
                    <td>${order.total}</td>
                    <td>
                      <span>{getPaymentMethod(order.method)}</span>
                    </td>
                    <td>{order.timestamp}</td>
                    <td>{stages[order.status]}</td>
                    <td>
                      <select
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option></option>
                        {stages.map((stage, i) => (
                          <option
                            key={i}
                            value={i}
                            selected={i === order.status ? true : false}
                          >
                            {i} - {stage}
                          </option>
                        ))}
                        <option value={-1}>Reject</option>
                      </select>
                      {/* <button
                        onClick={() =>
                          handleStatusChange(order.id, order.status)
                        }
                      >
                        Next Stage
                      </button> */}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </>
    );
  else return <></>;
}

const getPaymentMethod = (method) => {
  switch (method) {
    case 0:
      return "cash";
    case 1:
      return "card";
    default:
      return "none";
  }
};

export const getServerSideProps = async () => {
  var orders = await getAllOrders();
  return {
    props: { orders },
  };
};
