import { Paper, Stack, Title, Table, ActionIcon, Button } from "@mantine/core";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import SmallItem from "./shard/SmallItem";
import { getWishlist } from "@/redux/wishlist";
import { useSelector } from "react-redux";
function WishListPage() {
  const { wishlist } = useSelector(getWishlist);
  const rows = wishlist.map((element) => (
    <tr key={element.pid}>
      <td>
        {
          <ActionIcon
            color="red"
            variant="transparent"
            onClick={() => {
              dispatch(remove(element));
              console.log(element);
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
      <td>{`$ ${element.price}`}</td>
      <td>In Stock</td>
      <td style={{ verticalAlign: "middle !important" }}>
        {<Button color="teal">Add to cart</Button>}
      </td>
    </tr>
  ));

  return (
    <>
      <Stack align="center">
        <FaRegHeart size={40} color="#253d4e" />
        <Title color="#253d4e">My Wishlist</Title>
        <Table style={{ maxWidth: "80%" }}>
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
    </>
  );
}

export default WishListPage;
