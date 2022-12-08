import React from "react";
import styles from "./styles.module.scss";
import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
function CardStore({ name, owner_id, address, description, image, type_id }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className={styles.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt={`${name} image`}
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={600} color="#253d4e" className={styles.name}>
          Norway Fjord Adventures{name}
        </Text>
        <Badge color="pink" variant="light">
          HOT
        </Badge>
      </Group>
      <Stack>
        <Text size="xs" color="#253d4e">
          Address: so 1 Vo Van Ngan {address}{" "}
        </Text>

        <Text size="sm" color="dimmed" style={{ overflow: "auto" }}>
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
          {description}
        </Text>
      </Stack>

      <Button
        variant="light"
        color="teal"
        fullWidth
        mt="md"
        radius="sm"
        rightIcon={<BiRightArrowAlt size={20} />}
      >
        Detail
      </Button>
    </Card>
  );
}

export default CardStore;
