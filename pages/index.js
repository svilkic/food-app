import Head from "next/head";
import { getAllFeaturedProducts } from "/util/firebase.config";
// COMPONENTS
import Featured from "/components/Featured";
import FeaturedFoodList from "/components/FeaturedFood";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../util/firebase.config";
import sizeof from "firestore-size";
import { getAllProducts } from "/api/product";
import { createProduct, deleteProduct, featureProduct } from "../api/product";

export default function Home({ products, products1 }) {
  console.log(products1);
  return (
    <>
      <Head>
        <title>Food app</title>
        <meta name='description' content='Food app in your town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <Featured /> */}
      <FeaturedFoodList products={products} />
    </>
  );
}

export const getStaticProps = async () => {
  const products = await getAllFeaturedProducts();
  const products1 = await getAllProducts();

  return {
    props: { products, products1 },
    revalidate: 600,
  };
};
