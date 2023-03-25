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
  const path = router.pathname;
  const [exPath, setExPath] = useState("");

  // useEffect(() => {
  //   console.log(path);
  //   if (path.includes("/mystore")) {
  //     const res = path.split("mystore/")[1];
  //     if (res === undefined) {
  //       setExPath("");
  //     } else {
  //       setExPath("/" + res);
  //     }
  //   }
  // }, [path]);

  useEffect(() => {
    setTimeout(() => {
      setPageLoader(false);
    }, 200);
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
              {path !== "/mystore" &&
                path !== "/mystore/login" &&
                path !== "/login" &&
                path !== "/register" &&
                path !== "/paymentsuccess" && <Header />}
              {path !== "/mystore" &&
                path !== "/mystore/login" &&
                path !== "/login" &&
                path !== "/register" &&
                path !== "/paymentsuccess" && <BreadCrumb />}
              <Component {...pageProps} />
              {path !== "/mystore" &&
                path !== "/mystore/login" &&
                path !== "/login" &&
                path !== "/register" &&
                path !== "/paymentsuccess" && <Footer />}
            </NotificationsProvider>
          </MantineProvider>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
