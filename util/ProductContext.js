import React, { useContext, useState, useEffect } from "react";
import { db } from "./firebase.config";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { groupBy } from "./helpers";

const ProductContext = React.createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      // Collection ref
      const listingRef = collection(db, "products");
      // Query
      const q = query(listingRef);
      //Execute query
      const querySnap = await getDocs(q);
      let docs = [];
      querySnap.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // Products
      setProducts(docs);

      // Featured Products
      const featured = docs.filter((data) => data.featured === true);
      setFeaturedProducts(featured);

      // Group By Category
      const grouped = groupBy(docs, (data) => data.category);
      setProductsByCategory(grouped);

      setLoading(false);
    } catch (error) {
      // toast.error("Couldn't fetch listings")
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getProductById = (id) => {
    if (products.length > 0) {
      return products.filter((p) => p.id === id)[0];
    }
  };

  const value = {
    products,
    featuredProducts,
    productsByCategory,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
