// LIBS
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "/util/AuthContext";
import { useRouter } from "next/router";
// UTIL
import { formatMoney } from "/util/helpers";
import {
  deleteProduct,
  featureProduct,
  getAllProducts,
} from "/util/firebase.config";
// COMPONENTS
import SearchBar from "/components/ui/searchbar";
import Add from "/components/admin/Add";
import AdminNav from "/components/admin/AdminNav";
// CSS
import classes from "/styles/Admin.module.css";

export default function Products({ products }) {
  const { currentUser } = useAuth();
  const [productList, setProductList] = useState(products);
  const [showAdd, setShowAdd] = useState(false);
  const router = useRouter();

  const handleDelete = async (id, delete_url) => {
    if (delete_url) window.open(delete_url, "_blank").focus();
    if (window.confirm("Delete the item?")) {
      const res = await deleteProduct(id);
      if (res) setProductList(productList.filter((p) => p.id !== id));
    }
  };

  const handleFeatured = async (id, checked) => {
    if (window.confirm("Set item as featured?")) {
      await featureProduct(id, checked);
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
            <div>
              <div className={classes.titleContainer}>
                <h1 className={classes.title}>Products</h1>
                <button
                  className={classes.plus}
                  onClick={() => setShowAdd(true)}
                >
                  +
                </button>
              </div>
              <SearchBar />
            </div>
            <table className={classes.table}>
              <tbody>
                <tr className={classes.trTitle}>
                  <th>Image</th>
                  {/* <th>Id</th> */}
                  <th>Title</th>
                  <th>Price</th>
                  <th>Izdvojeno</th>
                  <th>Action</th>
                </tr>
              </tbody>
              {productList.map((product) => (
                <tbody key={product.id}>
                  <tr className={classes.trTitle}>
                    <td>
                      <Image
                        src={product.img}
                        width={50}
                        height={50}
                        objectFit='cover'
                        alt=''
                      />
                    </td>
                    {/* <td>
                      <Link href={`/product/${product.id}`}>{product.id}</Link>
                    </td> */}
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                    <td>{formatMoney(product?.variants[0].price)}</td>
                    <td>
                      <input
                        type='checkbox'
                        onChange={(e) =>
                          handleFeatured(product.id, e.target.checked)
                        }
                      />
                    </td>
                    <td>
                      <button className={classes.button}>Edit</button>
                      <button
                        className={classes.button}
                        onClick={() =>
                          handleDelete(product.id, product?.deleteImg)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        {showAdd && <Add setClose={() => setShowAdd(false)} />}
      </>
    );
  else return <></>;
}

export const getServerSideProps = async () => {
  const products = await getAllProducts();

  return {
    props: { products },
  };
};
