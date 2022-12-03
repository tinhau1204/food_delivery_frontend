import React, { useState } from "react";
import { Card, Image, ActionIcon, Text, Group, Button } from "@mantine/core";
import StarRating, { CountingStar } from "./components/StarRating";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import clsx from "classnames";
import styles from "./styles.module.scss";
import products from "@/lib/api/products";

function CardItem({ type, name, price, sale, preSale, unit, rating }) {
  const [isSale, setIsSale] = useState(true);
  const [addWishlist, setAddWishlist] = useState(false);
  const cardHeight = 400;
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        width: 250,
        minHeight: name.length > 27 ? cardHeight + 20 : cardHeight,
      }}
      className={styles.card}
    >
      <div className={styles.cornerRibbon}>
        <div
          className={clsx(
            {
              [styles.cornerRibbonChildHot]: type == "hot",
              [styles.cornerRibbonChildSale]: type == "sale",
              [styles.cornerRibbonChildNew]: type == "new",
            },
            styles.cornerRibbonChild,
          )}
        >
          <Text color="white">
            {type == "hot" ? "Hot" : type == "sale" ? "Sale" : "New"}
          </Text>
        </div>
      </div>

      <ActionIcon
        onClick={() => setAddWishlist(!addWishlist)}
        variant="transparent"
        className={styles.rightSection}
        color={addWishlist ? "red" : "gray"}
      >
        {addWishlist ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
      </ActionIcon>
      <Card.Section>
        <Image
          src="https://www.freepnglogos.com/uploads/food-png/food-grass-fed-beef-foodservice-products-grass-run-farms-4.png"
          style={{ padding: 20 }}
        />
      </Card.Section>
      <Text size="xs" color="grey">
        Category
      </Text>
      <Text size="md" weight={700}>
        {name}
      </Text>
      {/* Counting Star for rating */}
      <Group>
        <CountingStar count={parseInt(rating)} />
        <Text>{String(rating)}</Text>
      </Group>
      <Text size="xs" color="grey">
        Price per {unit}
      </Text>

      <Group position="apart">
        <Text weight={500}>${String(price)}</Text>
        {sale && (
          <Text size="sm" color="grey" strikethrough>
            ${String(preSale)}
          </Text>
        )}
        <Button
          className={styles.buttonAdd}
          leftIcon={<BsCartPlus />}
          variant="light"
          color="teal"
        >
          Add
        </Button>
      </Group>
    </Card>
  );
}

export default CardItem;
