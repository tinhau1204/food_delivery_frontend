import React from "react";
import { Alert, Button, Center } from "@mantine/core";
import MyStoreAllProductsPage from "components/MyStoreAllProductsPage";
import MyStoreAllProductsTypePage from "components/MyStoreAllProductsTypesPage";
import { useEffect, useState, useMemo } from "react";
import AlertPopup from "../shards/AlertPopup";
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
      <AlertPopup
        Title={"Login required"}
        Content={"We need you to login before accessing this page!"}
        LinkRef={"/seller/login"}
        ButtonName={"Login"}
      />
    </div>
  ) : (
    <div style={{ backgroundColor: "#1a1b1e", color: "white" }}></div>
  );
}
