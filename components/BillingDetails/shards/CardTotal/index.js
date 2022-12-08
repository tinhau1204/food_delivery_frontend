import React from "react";
import {
  Avatar,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  ScrollArea,
} from "@mantine/core";
import styles from "./styles.module.scss";
import SmallProduct from "./SmallProduct";
import SmallStatic from "./SmallStatic";
import { useEffect } from "react";
function CardTotal({ countItem }) {
  const itemBuy = [
    {
      image: "https://freepngimg.com/thumb/carrot/1-carrot-png-image.png",
      name: "Carrot",
      weight: "1",
      price: 24,
    },
    {
      image:
        "https://freepngimg.com/thumb/cucumber/11-cucumber-png-image-picture-download.png",
      name: "Cucumber",
      weight: "3",
      price: 24,
    },
    {
      image: "https://freepngimg.com/thumb/carrot/1-carrot-png-image.png",
      name: "Carrot",
      weight: "1",
      price: 24,
    },
    {
      image: "https://freepngimg.com/thumb/carrot/1-carrot-png-image.png",
      name: "Carrot",
      weight: "1",
      price: 24,
    },
    {
      image: "https://freepngimg.com/thumb/carrot/1-carrot-png-image.png",
      name: "Carrot",
      weight: "1",
      price: 24,
    },
  ];

  useEffect(() => {
    countItem(itemBuy.length);
  }, [countItem, itemBuy]);
  return (
    <Paper withBorder pt={10} pb={10}>
      <ScrollArea style={{ height: 250 }} type="auto">
        {itemBuy.map((item, index) => (
          <SmallProduct
            key={index}
            image={item.image}
            name={item.name}
            weight={item.weight}
            price={item.price}
          />
        ))}
      </ScrollArea>
      <SmallStatic />
    </Paper>
  );
}

export default CardTotal;
