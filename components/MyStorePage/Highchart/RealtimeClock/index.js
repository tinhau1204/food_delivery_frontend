import moment from "moment/moment";
import { Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

const RealtimeClock = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Group spacing={15}>
      <div
        style={{
          maxHeight: "38px",
          border: "1px solid #1971c2",
          borderRadius: "5px",
          padding: "0.375rem",
          alignItems: "center",
          paddingLeft: "0.625rem",
          paddingRight: "0.625rem",
        }}
      >
        <Text sx={{ fontFamily: "Bahnschrift" }}>{currentTime.format("h:mm A")}</Text>
      </div>
    </Group>
  );
};

export default RealtimeClock;
