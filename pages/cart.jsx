import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "/components/OrderDetail";
import { createOrder } from "/util/firebase.config";
import styles from "/styles/Cart.module.css";
import { formatMoney } from "/util/helpers";
import Link from "next/link";
import { removeProduct } from "/redux/slices/cartSlice";
import { changeProductQuantity, reset } from "/redux/slices/cartSlice";
import { generateID } from "/util/helpers";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const { products, total, quantity, discount } = useSelector(
    (state) => state.cart
  );

  const handleCreate = async (data) => {
    try {
      const oid = generateID();
      await createOrder({ id: oid, ...data, status: 0, products }, oid);
      dispatch(reset());
      router.push(`/order/${oid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (pid) => {
    dispatch(removeProduct(pid));
  };

  const handleQuantityChange = (pid, type = "+") => {
    dispatch(changeProductQuantity({ pid, type }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th></th>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product.pid} className={styles.tr}>
                <td>
                  <span
                    className={styles.icon}
                    onClick={() => handleRemove(product.pid)}
                  >
                    &#10005;
                  </span>
                </td>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img || "/img/pizza.png"}
                      layout='fill'
                      objectFit='cover'
                      alt='/img/pizza.png'
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>
                    <Link href={`/product/${product.pid}`}>
                      {product?.name}
                    </Link>
                  </span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product?.ingredients.map((ingredient, i) => {
                      return i > 0 ? " | " + ingredient.name : ingredient.name;
                    })}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>
                    {formatMoney(product.price)}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>
                    <span
                      className={styles.icon}
                      onClick={() => handleQuantityChange(product.pid, "-")}
                    >
                      &#8722;
                    </span>
                    {product.quantity}
                    <span
                      className={styles.icon}
                      onClick={() => handleQuantityChange(product.pid, "+")}
                    >
                      &#65291;
                    </span>
                  </span>
                </td>
                <td>
                  <span className={styles.total}>
                    {formatMoney(
                      calculateTotal(
                        product.price,
                        product.quantity,
                        product.ingredients
                      )
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <tr>
            <td>
              <p>Trenutno nema proizvoda u korpi</p>
            </td>
          </tr>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <div className={styles.cartTotal}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.subtotaltotalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>
              <span>{formatMoney(total)}</span>
            </div>
            <div className={styles.discountText}>
              <b className={styles.totalTextTitle}>Discount:</b>
              <span>-{formatMoney(total * (discount / 100))}</span>
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>
              <span>{formatMoney(total - total * (discount / 100))}</span>
            </div>

            <div className={styles.paymentMethods}>
              <button className={styles.button} onClick={() => setCash(true)}>
                CASH ON DELIVERY
              </button>
            </div>
          </div>
        </div>
        {cash && (
          <OrderDetail
            total={total}
            createOrder={handleCreate}
            onCancle={() => setCash(false)}
          />
        )}
      </div>
    </div>
  );
};

const calculateTotal = (price, quantity, extras) => {
  let sum = 0;
  sum += parseFloat(price);
  extras.forEach((i) => (sum += parseFloat(i.price)));
  sum = parseFloat(sum * quantity);
  return Number(sum);
};

export default Cart;
