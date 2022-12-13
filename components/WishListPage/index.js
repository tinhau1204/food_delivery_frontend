import {
  Paper,
  Stack,
  Title,
  Table,
  ActionIcon,
  Button,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import SmallItem from "./shard/SmallItem";
import { getWishlist, addToWishlist, removeWishlist } from "@/redux/wishlist";
import { getCart, addToCart, updateCart } from "@/redux/cart";
import { useSelector, useDispatch } from "react-redux";
function WishListPage() {
  const { wishlist } = useSelector(getWishlist);
  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log(
      "here ",
      cart.some((item) => item.pid === product.pid),
    );
    if (cart.some((item) => item.pid === product.pid)) {
      var oldItem = cart.find((item) => item.pid === product.pid);
      console.log(oldItem);
      var newItem = { ...oldItem, amount: oldItem.amount + 1 };
      dispatch(updateCart(newItem));
      dispatch(removeWishlist(product));
    } else {
      var newItem = { ...product, amount: 1 };
      dispatch(addToCart(newItem));
      dispatch(removeWishlist(product));
    }
  };

  const rows = wishlist.map((element) => (
    <tr key={element.pid}>
      <td>
        {
          <ActionIcon
            color="red"
            variant="transparent"
            onClick={() => {
              dispatch(removeWishlist(element));
            }}
          >
            <BsTrash size={20} />
          </ActionIcon>
        }
      </td>
      <td>
        {
          <SmallItem
            image={element.image}
            name={element.name}
            type={element.type}
            store_name={element.store_name}
          />
        }
      </td>
      <td>{`$ ${element.price} .00`}</td>
      <td>In Stock</td>
      <td style={{ verticalAlign: "middle !important" }}>
        {
          <Button color="teal" onClick={() => handleAddToCart(element)}>
            Add to cart
          </Button>
        }
      </td>
    </tr>
  ));

  return (
    <>
      {wishlist.length > 0 ? (
        <Stack align="center" p="xl">
          <FaRegHeart size={40} color="#253d4e" />
          <Title color="#253d4e">My Wishlist</Title>
          <Table style={{ maxWidth: "85%" }}>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Product Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Stack>
      ) : (
        <Paper>
          <Text>Empty Wishlist</Text>
        </Paper>
      )}
    </>
  );
}

export default WishListPage;
