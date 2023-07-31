import React from "react";
import { Paper, Group } from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import AlertPopup from "../shards/AlertPopup";
import Highchart from "./Highchart";
import StatisticSection from "./StatisticSection";

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
        }}
      />
      <AlertPopup
        Title={"Login required"}
        Content={"We need you to login before accessing this page!"}
        LinkRef={"/seller/login"}
        ButtonName={"Login"}
      />
    </div>
  ) : (
    <Paper>
      <Group w="81.063rem" h="45.438rem">
        <Highchart />
        <StatisticSection />
      </Group>
    </Paper>
  );
}
