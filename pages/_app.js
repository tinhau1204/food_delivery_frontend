import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "../styles/reset.css";
import Header from "@/components/shards/Header";
import Footer from "@/components/shards/Footer";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "@/redux";
import BreadCrumb from "@/components/shards/BreadCrumb";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          {router.pathname !== "/login" && router.pathname !== "/register" && (
            <Header />
          )}
          {router.pathname !== "/login" && router.pathname !== "/register" && (
            <BreadCrumb />
          )}
          <Component {...pageProps} />
          {router.pathname !== "/login" && router.pathname !== "/register" && (
            <Footer />
          )}
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
