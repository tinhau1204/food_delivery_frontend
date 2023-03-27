import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { useEffect, useState } from "react";
import "../styles/reset.css";
import Header from "@/components/shards/Header";
import Footer from "@/components/shards/Footer";
import NavigationBar from "@/components/MyStorePage/NavigationBar";
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
  const [isSeller, setIsSeller] = useState();

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
    if (path.includes("mystore")) {
      setIsSeller(true);
    } else setIsSeller(false);
  }, [path]);

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
        <>
          {isSeller ? (
            <MantineProvider
              theme={{ colorScheme: "dark" }}
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider>
                {path !== "/mystore/login" && path !== "/mystore/register" && (
                  <NavigationBar />
                )}
                <Component {...pageProps} />
              </NotificationsProvider>
            </MantineProvider>
          ) : (
            <Provider store={store}>
              <MantineProvider
                theme={{ colorScheme: "dark" }}
                withGlobalStyles
                withNormalizeCSS
              >
                <NotificationsProvider>
                  {path !== "/login" &&
                    path !== "/register" &&
                    path !== "/paymentsuccess" && <Header />}
                  {path !== "/login" &&
                    path !== "/register" &&
                    path !== "/paymentsuccess" && <BreadCrumb />}
                  <Component {...pageProps} />
                  {path !== "/login" &&
                    path !== "/register" &&
                    path !== "/paymentsuccess" && <Footer />}
                </NotificationsProvider>
              </MantineProvider>
            </Provider>
          )}
        </>
      )}
    </>
  );
}

export default MyApp;
