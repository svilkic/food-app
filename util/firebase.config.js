// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
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
import { firebaseTimestampToString, generateID, groupBy } from "./helpers";
import { serverTimestamp } from "firebase/firestore";
import sizeof from "firestore-size";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnEvebIuTRlQER3F9doR-DDUhg8pye4B4",
  authDomain: "food-app-900ef.firebaseapp.com",
  projectId: "food-app-900ef",
  storageBucket: "food-app-900ef.appspot.com",
  messagingSenderId: "288627113193",
  appId: "1:288627113193:web:39f8b06f86e9e0c08dc478",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

/**`
 * Gets a product/{id} document
 * @param  {string} id
 */
export async function getProductById(id) {
  const productsRef = doc(db, "products", id);
  const productsSnap = await getDoc(productsRef);

  return productsSnap;
}

/**`
 * Gets all products
 */
export async function getAllProducts() {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
}

/**`
 * Gets all featured products
 */
export async function getAllFeaturedProducts() {
  const q = query(collection(db, "products"), where("featured", "==", true));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
}

/**`
 * Gets all products by category
 */
export async function getAllProductsByCategory() {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);

  const data = [];
  var size = 0;
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
    size += sizeof(doc.data());
  });
  console.log(`${size}b`);

  // Group By Category
  const grouped = groupBy(data, (data) => data.category);

  return grouped;
}

/**`
 * Create product
 */
export async function createProduct(data, pid) {
  const docRef = await setDoc(doc(db, "products", pid), data);
  return docRef;
}

/**`
 * Delete product
 */
export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, "products", id));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**`
 * Feature product
 */
export async function featureProduct(id, featured) {
  try {
    await updateDoc(doc(db, "products", id), {
      featured: featured,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// =================================
// ORDERS
// =================================

/**`
 * Gets all orders
 */
export async function getAllOrders() {
  const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const data = [];

  querySnapshot.forEach((doc) => {
    const d = doc.data();
    data.push({
      id: doc.id,
      ...d,
      timestamp: firebaseTimestampToString(d.timestamp),
    });
  });

  return data;
}

/**`
 * Get order by id
 */
export async function getOrderById(id) {
  const orderRef = doc(db, "orders", id);
  const order = await getDoc(orderRef);
  const data = order.data();
  return { ...data, timestamp: firebaseTimestampToString(data.timestamp) };
}

/**`
 * Create order
 */
export async function createOrder(data, oid) {
  const docRef = await setDoc(doc(db, "orders", oid), {
    ...data,
    timestamp: new serverTimestamp(),
  });
  return docRef;
}

/**`
 * Update order status
 */
export async function updateOrderStatus(orderId, status) {
  try {
    const res = await setDoc(
      doc(db, "orders", orderId),
      { status },
      { merge: true }
    );
    return true;
  } catch (error) {
    return false;
  }
}

//=====================================
//Authentication
//=====================================

export async function SignIn(username, password) {
  const data = await signInWithEmailAndPassword(auth, username, password);
  return data;
}
export async function SignOut(username, password) {
  await signOut(auth);
}
