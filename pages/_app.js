import "../styles/globals.css";
import Layout from "../components/_layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
