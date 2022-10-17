import Head from "next/head";
import { getAllProductsByCategory } from "/util/firebase.config";
// COMPONENTS
import FoodList from "/components/FoodList";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title> Menu | Food App</title>
        <meta name='description' content='Food app in your town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FoodList products={products} />
    </>
  );
}

export const getStaticProps = async () => {
  const products = await getAllProductsByCategory();

  return {
    props: { products },
    revalidate: 600,
  };
};
