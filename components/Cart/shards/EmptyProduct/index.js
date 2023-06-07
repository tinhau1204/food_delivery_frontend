import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

function EmptyProduct() {
  return (
    <>
      <Center style={{ height: 350 }}>
        <Stack>
          <Group spacing="sm">
            <Title color="white">Shopping Cart Is</Title>
            <Title color="teal">Empty</Title>
          </Group>
          <Text color="white" size="sm" style={{ textAlign: "center" }}>
            Go to store and add to cart products you&apos;d like to build
          </Text>
          <Link href="/" passhref>
            <Button leftIcon={<BsArrowLeft />} color="teal">
              Return to store
            </Button>
          </Link>
        </Stack>
      </Center>
    </>
  );
}

export default EmptyProduct;
