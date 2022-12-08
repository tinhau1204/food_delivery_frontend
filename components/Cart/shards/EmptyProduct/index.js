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
            <Title color="#253d4e">Shopping Cart Is</Title>
            <Title color="teal">Empty</Title>
          </Group>
          <Text color="gray" size="sm" style={{ textAlign: "center" }}>
            Go to shop and add to cart products you&apos;d like to build
          </Text>
          <Link href="/" passHref>
            <Button leftIcon={<BsArrowLeft />} color="teal">
              Return to shop
            </Button>
          </Link>
        </Stack>
      </Center>
    </>
  );
}

export default EmptyProduct;
