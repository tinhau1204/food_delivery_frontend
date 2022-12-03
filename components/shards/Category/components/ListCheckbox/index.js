import React from "react";
import styles from "./styles.module.scss";
import { Container, Checkbox } from "@mantine/core";

function ListCheckbox({ data }) {
  return (
    <Container p={0}>
      {data.map((item, index) => (
        <Checkbox
          key={index}
          label={item.title}
          color="green"
          style={{ marginBottom: 15 }}
        />
      ))}
    </Container>
  );
}

export default ListCheckbox;
