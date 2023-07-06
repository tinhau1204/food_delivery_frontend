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
          border: "1px solid #1971c2",
          borderRadius: "5px",
          padding: "0.375rem",
          alignItems: "center",
          width: "7.125rem",
        }}
      >
        <Text sx={{ fontFamily: "Bahnschrift" }} ml={12}>
          {currentTime.format("h:mm:ss a")}
        </Text>
      </div>
      <div
        style={{
          border: "1px solid #1971c2",
          borderRadius: "5px",
          padding: "0.375rem",
          alignItems: "center",
          width: "8.525rem",
        }}
      >
        <Text sx={{ fontFamily: "Bahnschrift" }} ml={12}>
          {currentTime.format("MMMM Do YYYY")}
        </Text>
      </div>
    </Group>
  );
};

export default RealtimeClock;
