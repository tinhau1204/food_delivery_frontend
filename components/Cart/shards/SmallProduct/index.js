import React from "react";
import { Group, Text, Stack, Avatar } from "@mantine/core";
import styles from "./styles.module.scss";
function SmallProduct({ image, name, store_name, type }) {
  return (
    <Group>
      <Avatar radius="xs" size="lg" src={image} className={styles.foodImage} />
      <Stack spacing="none" style={{ flex: 1 }}>
        <Text weight={600}>{name}</Text>
        <Text size="xs" color="white">
          Category: {type}
        </Text>
        <Text size="xs" color="white">
          Store: {store_name}
        </Text>
      </Stack>
    </Group>
  );
}

export default SmallProduct;
