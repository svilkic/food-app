import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import sizeof from "firestore-size";
import { generateID } from "../util/helpers";
import { db } from "/util/firebase.config";

const collectionName = "products1";

/**`
 * Get product by ID
 */
export async function getProductById(productId) {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);

  var data = [];
  querySnapshot.forEach((doc) => {
    const docFields = doc.data();
    const docId = doc.id;
    const keys = Object.keys(docFields);
    const docData = formatProductArray(
      keys,
      docId,
      docFields,
      (data) => data.id == productId
    );
    data = [...data, ...docData];
  });
  return data;
}

/**`
 * Gets all products
 */
export async function getAllProducts() {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);

  var data = [];
  querySnapshot.forEach((doc) => {
    const docFields = doc.data();
    const docId = doc.id;
    const keys = Object.keys(docFields);
    const docData = formatProductArray(keys, docId, docFields);
    data = [...data, ...docData];
  });
  return data;
}

/**`
 * Gets all featured products
 */
export async function getAllFeaturedProducts() {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);

  var data = [];
  querySnapshot.forEach((doc) => {
    const docFields = doc.data();
    const docId = doc.id;
    const keys = Object.keys(docFields);
    const docData = formatProductArray(
      keys,
      docId,
      docFields,
      (data) => data?.featured
    );
    data = [...data, ...docData];
  });
  return data;
}

/**`
 * Gets all products by category
 */
export async function getAllProductsByCategory() {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((doc) => {
    const docFields = doc.data();
    const docId = doc.id;
    const keys = Object.keys(docFields);
    const docData = formatProductArray(
      keys,
      docId,
      docFields,
      (doc) => doc.featured
    );
    data.push({ category: docId, products: docData });
  });
  return data;
}

/**
 * Feature product
 * */
export async function featureProduct(docId, fieldID, featured) {
  try {
    await setDoc(
      doc(db, collectionName, docId),
      {
        [fieldID]: {
          featured: featured,
        },
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Delete product
 */
export async function deleteProduct(docId, fieldID) {
  try {
    await updateDoc(doc(db, collectionName, docId), {
      [fieldID]: deleteField(),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Create Product
 */
export async function createProduct(docId, data) {
  try {
    let productId = await generateID();
    await updateDoc(doc(db, collectionName, docId), {
      [productId]: {
        ...data,
      },
    });
    return productId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Function gets all fields from documents
 *
 */
function formatProductArray(keys, docId, fieldData, filterFunction = (d) => d) {
  let array = [];
  keys.forEach((key) => {
    const field = { id: key, category: docId, ...fieldData[key] };
    if (filterFunction(field)) array.push(field);
  });
  return array;
}

/**
 * collection/category/products/....
 * products/pizza/123241/...
 */
