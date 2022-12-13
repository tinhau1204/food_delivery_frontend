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
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import SmallProduct from "./shards/SmallProduct";
import QuantityInput from "./shards/QuantityInput";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart, removeFromCart } from "@/redux/cart";
import EmptyProduct from "./shards/EmptyProduct";
import CardTotal from "./shards/CardTotal";
import BillingDetails from "../BillingDetails";
function Cart() {
  const [quantity, setQuantity] = useState({ amount: null, pid: null });
  const [open, setOpen] = useState(false);
  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;

  const remove = (item) => {
    const removeItem = dispatch(removeFromCart(item));
    return removeItem;
  };

  console.log("cart", cart);
  const rows = cart.map((element) => (
    <tr key={element.pid}>
      <td>
        {
          <SmallProduct
            image={img_load + element.image}
            name={element.name}
            type={element.type}
            store_name={element.store_name}
          />
        }
      </td>
      <td>{`$ ${element.price} `}</td>
      <td>
        {
          <QuantityInput
            value={element.amount}
            onchangeValue={(e) => {
              dispatch(updateCart({ ...element, amount: e }));
            }}
          />
        }
      </td>
      <td>{"$" + element.amount * element.price}</td>
      <td>
        {
          <ActionIcon
            color="red"
            variant="transparent"
            onClick={() => {
              dispatch(remove(element));
            }}
          >
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
            <CardTotal
              subTotal={cart.reduce(
                (total, item) => (total += item.amount * item.price),
                0,
              )}
              tax={0}
              onClick={() => setOpen(true)}
            />
          </Group>

          <BillingDetails opened={open} closed={() => setOpen(false)} />
        </>
      ) : (
        <EmptyProduct />
      )}
    </Container>
  );
}

export default Cart;
