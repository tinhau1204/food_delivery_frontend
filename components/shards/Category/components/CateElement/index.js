import { Paper, Text, Container, Badge, Box, Group } from "@mantine/core";
import React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";

function CateElement({ data, onclickcate }) {
  const [isSelected, setIsSelected] = useState("");
  return (
    <Container p={0} style={{ marginTop: 10, marginBottom: 10 }}>
      {data.map((item, index) => (
        <Paper
          shadow={isSelected == item.name ? "xl" : "none"}
          p="5px"
          key={index}
          style={{ marginBottom: 10 }}
          className={styles.changeStatus}
          onClick={() => {
            setIsSelected(item.name);
            onclickcate(item.name);
          }}
        >
          <Group position="apart" align="center">
            <Group spacing="xs">
              {item.icon}
              <Text
                color={isSelected == item.name ? "teal" : "#253d4e"}
                weight={700}
                className={styles.changeStatusText}
              >
                {item.name}
              </Text>
            </Group>
            <Badge color="white" radius="xl">
              {item.quantity}
            </Badge>
          </Group>
        </Paper>
      ))}
    </Container>
  );
}

export default CateElement;
