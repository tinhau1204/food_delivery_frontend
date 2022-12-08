import {
  Group,
  Text,
  Title,
  Table,
  ActionIcon,
  NumberInput,
  Center,
  Stack,
  Container,
} from "@mantine/core";
import React from "react";
import { BsTrash } from "react-icons/bs";
import SmallProduct from "./shards/SmallProduct";
import QuantityInput from "./shards/QuantityInput";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/redux/cart";
import EmptyProduct from "./shards/EmptyProduct";
import CardTotal from "./shards/CardTotal";
function Cart() {
  const elements = [
    {
      id: 1,
      image: "",
      name: "Grabuz Ukraine",
      cate: "Vegetables",
      weight: "1",
      price: 24,
      quantity: 1,
      total: 24,
    },
    {
      id: 2,
      image: "",
      name: "Grabuz Ukraine",
      cate: "Vegetables",
      weight: "1",
      price: 24,
      quantity: 1,
      total: 24,
    },
    {
      id: 3,
      image: "",
      name: "Grabuz Ukraine",
      cate: "Vegetables",
      weight: "1",
      price: 24,
      quantity: 1,
      total: 24,
    },
    {
      id: 4,
      image: "",
      name: "Grabuz Ukraine",
      cate: "Vegetables",
      weight: "1",
      price: 24,
      quantity: 1,
      total: 24,
    },
  ];
  const { cart } = useSelector(getCart);
  console.log("cart", cart);
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>
        {
          <SmallProduct
            image={element.image}
            name={element.name}
            cate={element.cate}
            weight={element.weight}
          />
        }
      </td>
      <td>{"$" + element.price + ".00"}</td>
      <td>{<QuantityInput value={element.quantity} />}</td>
      <td>{"$" + element.total + ".00"}</td>
      <td>
        {
          <ActionIcon color="red" variant="transparent">
            <BsTrash size={20} />
          </ActionIcon>
        }
      </td>
    </tr>
  ));

  return (
    <Container style={{ maxWidth: 1519 }} px={120} py={50}>
      {cart.length !== 0 ? (
        <>
          <Title>Shopping Cart</Title>
          <Group spacing="xs">
            <Text>There are</Text>
            <Text color="teal">
              {cart.length} {cart.length < 2 ? "product" : "products"}
            </Text>
            <Text>in your cart</Text>
          </Group>
          {/* Cart Table */}

          <Group position="apart" style={{ flexWrap: "nowrap", columnGap: 20 }}>
            <Table style={{ flex: 1 }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: "middle !important" }}>
                {rows}
              </tbody>
            </Table>
            <CardTotal />
          </Group>
        </>
      ) : (
        <EmptyProduct />
      )}
    </Container>
  );
}

export default Cart;
