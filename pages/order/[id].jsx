import Image from "next/image";
import React, { useState } from "react";
import constants from "../../constants";
import { getOrderById } from "/util/firebase.config";
import styles from "/styles/Order.module.css";
import { formatMoney } from "/util/helpers";

export default function Order({ order }) {
  const [status, setStatus] = useState(order.status);

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order.id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              <td>
                <span className={styles.total}>{formatMoney(order.total)}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src='/img/paid.png' width={30} height={30} alt='' />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src='/img/bake.png' width={30} height={30} alt='' />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src='/img/bike.png' width={30} height={30} alt='' />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src='/img/delivered.png' width={30} height={30} alt='' />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src='/img/checked.png'
                width={20}
                height={20}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>
              {formatMoney(order.total)}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>
              {formatMoney(0.0)}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>
              {formatMoney(order.total)}
            </div>
            <button disabled className={styles.button}>
              PAID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const orderId = params.id;
  const res = await getOrderById(orderId);
  if (!res)
    return {
      notFound: true,
    };
  return {
    props: { order: { id: orderId, ...res } },
  };
};
