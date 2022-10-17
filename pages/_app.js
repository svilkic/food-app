// LIBS
import { Provider } from "react-redux";
import { store } from "/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
//COMPONENTS
import Layout from "/components/Layout";
// UTIL
import { AuthProvider } from "/util/AuthContext";
import { ProductProvider } from "/util/ProductContext";
import { OrdersProvider } from "/util/OrderContext";
// CSS
import "/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <OrdersProvider>
            <Layout>
              <ToastContainer />
              <Component {...pageProps} />
            </Layout>
          </OrdersProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
