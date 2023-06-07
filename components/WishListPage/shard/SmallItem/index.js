import React from "react";
import { Group, Avatar, Stack, Text } from "@mantine/core";
import styles from "./styles.module.scss";
function SmallItem({ name, image, type, store_name }) {
  return (
    <>
      <Group>
        <Avatar
          radius="xs"
          size="lg"
          src={image}
          className={styles.foodImage}
        />
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
    </>
  );
}

export default SmallItem;
