import dynamic from "next/dynamic";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import "../styles/reset.css";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import store from "@/redux";
// Using lazy loading for components (optional)
import Header from "@/components/shards/Header";
//import Footer from "@/components/shards/Footer";
const Footer = dynamic(() => import("@/components/shards/Footer"));
import NavigationBar from "@/components/MyStorePage/NavigationBar";
import BreadCrumb from "@/components/shards/BreadCrumb";
//

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageloader, setPageLoader] = useState(true);
  const path = router.pathname;
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV == "development") {
      setTimeout(() => {
        setPageLoader(false);
      }, 500);
    }
  }, []);

  useMemo(() => {
    if (path.includes("seller") || path.includes("mystore")) {
      if (isSeller !== true) {
        setIsSeller(true);
        setPageLoader(true);
      }
    } else {
      if (isSeller !== false) {
        setIsSeller(false);
        setPageLoader(true);
      }
    }
  }, [path]);

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
            size={50}
            style={{
              marginBlock: "auto",
            }}
          />
        </div>
      ) : (
        <>
          {isSeller ? (
            //<Provider store={store}>
            // Alert: Mantine v6.0 only need 1 <Notification/> before <Component/> rendering //
            <MantineProvider
              theme={{ colorScheme: "dark" }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Notifications />
              {!path.includes("/customer") && !path.includes("/seller") && (
                <NavigationBar />
              )}
              <Component {...pageProps} />
            </MantineProvider>
          ) : (
            //</Provider>
            <Provider store={store}>
              <MantineProvider
                theme={{ colorScheme: "dark" }}
                withGlobalStyles
                withNormalizeCSS
              >
                <Notifications />
                {!path.includes("/customer") &&
                  !path.includes("/seller") &&
                  path !== "/_error" &&
                  path !== "/paymentsuccess" && <Header />}
                {!path.includes("/customer") &&
                  !path.includes("/seller") &&
                  path !== "/_error" &&
                  path !== "/paymentsuccess" && <BreadCrumb />}
                <Component {...pageProps} />
                {!path.includes("/customer") &&
                  !path.includes("/seller") &&
                  path !== "/_error" &&
                  path !== "/paymentsuccess" && <Footer />}
              </MantineProvider>
            </Provider>
          )}
        </>
      )}
    </>
  );
}

export default MyApp;
