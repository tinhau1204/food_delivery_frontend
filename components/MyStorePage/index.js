import React from "react";
import { Alert, Button, Center } from "@mantine/core";
import MyStoreAllProductsPage from "components/MyStoreAllProductsPage";
import MyStoreAllProductsTypePage from "components/MyStoreAllProductsTypesPage";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

export default function MyStorePage() {
  const [isLogin, setIsLogin] = useState(false);

  useMemo(() => {
    if (document.cookie.indexOf("Sel") > -1) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return !isLogin ? (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          zIndex: 2,
          filter: "blur(8px)",
          "-webkit-filter": "blur(8px)",
        }}
      ></div>
      <Alert
        title="Login required"
        color="teal"
        style={{
          zIndex: 2,
          width: 350,
          height: 150,
          position: "absolute",
          left: "40%",
          top: "40%",
          transform: "translate (-50%,-50%)",
        }}
      >
        We need you to login before accessing this page!
        <Center style={{ paddingTop: 20 }}>
          <Link href={"/seller/login"}>
            <Button variant="outline" color="teal" type="submit">
              Login
            </Button>
          </Link>
        </Center>
      </Alert>
    </div>
  ) : (
    <div style={{ backgroundColor: "#1a1b1e", color: "white" }}></div>
  );
}
