import React, { useState } from "react";
import { Card, Image, ActionIcon, Text, Group, Button } from "@mantine/core";
import StarRating, { CountingStar } from "./components/StarRating";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import clsx from "classnames";
import styles from "./styles.module.scss";
import products from "@/lib/api/products";
import Link from "next/link";

function CardItem({ type, name, price, sale, preSale, unit, rating, onClick }) {
  const [isSale, setIsSale] = useState(true);
  const [addWishlist, setAddWishlist] = useState(false);
  const cardHeight = 400;
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      style={{
        width: 250,
        minHeight: name.length > 27 ? cardHeight + 20 : cardHeight,
        border: "2px solid #ccc",
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
          alt="food"
        />
      </Card.Section>
      <Text size="xs" color="grey">
        Category
      </Text>
      <Link href="/detail" passHref>
        <Text size="md" weight={700} className={styles.nameNavigate}>
          {name}
        </Text>
      </Link>
      {/* Counting Star for rating */}
      <Group>
        <CountingStar count={parseInt(rating)} />
        <Text>{"(" + String(rating) + ".0" + ")"}</Text>
      </Group>
      <Text size="xs" color="grey">
        Price per {unit}
      </Text>

      <Group position="apart">
        <Text weight={500}>${String(price) + ".00"}</Text>
        {sale && (
          <Text size="sm" color="grey" strikethrough>
            ${String(preSale) + ".00"}
          </Text>
        )}
        <Button
          className={styles.buttonAdd}
          leftIcon={<BsCartPlus />}
          variant="light"
          color="teal"
          onClick={onClick}
        >
          Add
        </Button>
      </Group>
    </Card>
  );
}

export default CardItem;
