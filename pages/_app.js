import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";
import AuthProvider from "../components/auth/_authProvider";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
