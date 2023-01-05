import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { useEffect, useState } from "react";
import "../styles/reset.css";
import Header from "@/components/shards/Header";
import Footer from "@/components/shards/Footer";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "@/redux";
import BreadCrumb from "@/components/shards/BreadCrumb";
import { NotificationsProvider } from "@mantine/notifications";
import { Loader } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageloader, setPageLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageLoader(false);
    }, 1500);
  }, []);

  return (
    <>
      {pageloader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Loader
            variant="dots"
            size={100}
            style={{
              marginBlock: "auto",
            }}
          />
        </div>
      ) : (
        <Provider store={store}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
              {router.pathname !== "/login" &&
                router.pathname !== "/register" &&
                router.pathname !== "/paymentsuccess" && <Header />}
              {router.pathname !== "/login" &&
                router.pathname !== "/register" &&
                router.pathname !== "/paymentsuccess" && <BreadCrumb />}
              <Component {...pageProps} />
              {router.pathname !== "/login" &&
                router.pathname !== "/register" &&
                router.pathname !== "/paymentsuccess" && <Footer />}
            </NotificationsProvider>
          </MantineProvider>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
