import React from "react";
import styles from "./styles.module.scss";
import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

function CardStore({ name, owner_id, address, description, image, type_id }) {
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className={styles.card}>
      <Card.Section>
        <Image src={img_load + image} height={160} alt={`${name} image`} />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={600} color="#253d4e" className={styles.name}>
          {name}
        </Text>
        <Badge color="pink" variant="light">
          {type_id}
        </Badge>
      </Group>
      <Stack>
        <Text size="xs" color="#253d4e">
          {address}
        </Text>
        <Text size="sm" color="dimmed" style={{ overflow: "auto" }}>
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
