import React from "react";
import styles from "./styles.module.scss";
import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

function CardStore({
  id,
  name,
  address,
  description,
  image,
  type_name,
  active_date,
}) {
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className={styles.card}>
      <Card.Section>
        <Image src={img_load + image} height={160} alt={`${name} image`} />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text
          weight={600}
          color="#29c75b"
          fontWeight="bold"
          className={styles.name}
        >
          {name}
        </Text>
      </Group>
      <Stack>
        <Text size="xs" color="#253d4e">
          {address}
        </Text>
        <Text size="sm" color="dimmed" style={{ overflow: "auto" }}>
          {description}
        </Text>
      </Stack>
      <Group position="apart">
        <Badge color="pink" variant="light" mt={50}>
          {type_name}
        </Badge>
        <Link href={"/store/detail?id=" + id}>
          <Button
            size="xs"
            mt={50}
            styles={(theme) => ({
              root: {
                color: "#0c5418",
                backgroundColor: "#teal",
                border: 0,
                height: 42,
                paddingRight: 20,

                "&:hover": {
                  backgroundColor: theme.fn.darken("#27ca7d", 0.05),
                },
              },
            })}
            variant="light"
            color="teal"
            radius="sm"
            rightIcon={
              <BiRightArrowAlt
                size={20}
                style={{
                  color: "#121212",
                }}
              />
            }
          >
            Detail
          </Button>
        </Link>
      </Group>
    </Card>
  );
}

export default CardStore;
