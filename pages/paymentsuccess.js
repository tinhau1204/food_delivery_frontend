import React from "react";
import { Box, Image, Paper, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
function paymentsuccess() {
  const [timeleft, setTimeleft] = useState(5);
  const router = useRouter();
  useEffect(() => {
    if (timeleft === 0) {
      router.push("/");
    }

    if (timeleft < 0) {
      setTimeleft(0);
    }

    setInterval(() => {
      setTimeleft(timeleft - 1);
    }, 1000);
  }, [timeleft]);

  return (
    <div style={{ width: "auto", height: "100vh", backgroundColor: "#27ca7d" }}>
      <Paper
        style={{
          width: "500px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          alignItems: "center",
        }}
        p={10}
      >
        <div style={{ width: 250, marginLeft: "auto", marginRight: "auto" }}>
          <Image loading="lazy" src="/images/check.gif" />
        </div>

        <Title align="center" size={20} color="white">
          Your Order will be accepted soon
        </Title>

        <Text size={15} color="white" align="center" mt={5}>
          The website will be redirected to the homepage after {timeleft}
        </Text>
      </Paper>
    </div>
  );
}

export default paymentsuccess;
