import { Button, Divider, Group, Paper, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

function CardTotal({ subTotal, discount, shipping, tax, total }) {
  return (
    <Paper p="md" withBorder style={{ marginTop: 20, width: 300 }}>
      <Group position="apart">
        <Text size="lg" weight={700} color="#253d4e">
          Subtoal:{" "}
        </Text>
        <Text color="#253d4e">{"$" + (subTotal ?? 0) + ".00"}</Text>
      </Group>
      <Divider my="sm" variant="dashed" />
      <Group position="apart">
        <Text size="lg" weight={700} color="#253d4e">
          Discount:{" "}
        </Text>
        <Text color="#253d4e">{"-$" + "0" + ".00"}</Text>
      </Group>
      <Divider my="sm" variant="dashed" />
      <Group position="apart">
        <Text size="lg" weight={700} color="#253d4e">
          Shipping:{" "}
        </Text>
        <Text color="#253d4e">{"Free"}</Text>
      </Group>
      <Divider my="sm" variant="dashed" />

      <Group position="apart">
        <Text size="lg" weight={700} color="#253d4e">
          Estimated Tax:{" "}
        </Text>
        <Text color="#253d4e">{"$" + tax + ".00"}</Text>
      </Group>
      <Divider my="sm" />
      <Group position="apart">
        <Text size="lg" weight={700} color="#253d4e">
          Total:{" "}
        </Text>
        <Text color="#253d4e">
          {"$" + (Number(tax) + Number(subTotal)) + ".00"}
        </Text>
      </Group>
      <Button
        leftIcon={<AiOutlineShoppingCart />}
        color="teal"
        style={{ width: "100%", marginTop: 10 }}
      >
        <Link href="/checkout">Checkout</Link>
      </Button>
    </Paper>
  );
}

export default CardTotal;
