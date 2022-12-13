import {
  Container,
  Avatar,
  Stack,
  Text,
  Group,
  Divider,
  Center,
  Grid,
} from "@mantine/core";
import React from "react";
import styles from "./styles.module.scss";

function SmallProduct({ image, name, weight, price }) {
  return (
    <Container px="md" style={{ width: 400 }}>
      <Grid columns={12} align="center">
        <Grid.Col span={10}>
          <Group>
            <Avatar
              radius="xs"
              size="lg"
              src={image}
              className={styles.foodImage}
            />
            <Stack spacing="none">
              <Text weight={600}>{name}</Text>
              <Text size="xs" color="gray">
                Weight: {weight + "kg"}
              </Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={2}>
          <Text color="#334959" style={{ lineHeight: "100%" }}>
            {"$" + Number(weight) * Number(price)}
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="sm" variant="dashed" />
    </Container>
  );
}

export default SmallProduct;
