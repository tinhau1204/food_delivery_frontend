import React, { useState, useEffect } from "react";
import { Card, Image, ActionIcon, Text, Group, Button } from "@mantine/core";
import StarRating, { CountingStar } from "./components/StarRating";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import clsx from "classnames";
import styles from "./styles.module.scss";
import products from "@/lib/api/products";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, addToWishlist } from "@/redux/wishlist";
function CardItem({
  pid,
  type,
  name,
  price,
  store_name,
  image,
  ordered,
  onClick,
}) {
  const [addWishlist, setAddWishlist] = useState(false);
  const cardHeight = 400;
  const { wishlist } = useSelector(getWishlist);
  const dispatch = useDispatch();

  const toggleWishlist = () => {
    setAddWishlist(!addWishlist);
    dispatch(
      addToWishlist({ pid, type, name, price, store_name, image, ordered }),
    );
  };

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
        onClick={toggleWishlist}
        variant="transparent"
        className={styles.rightSection}
        color={addWishlist ? "red" : "gray"}
      >
        {addWishlist ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
      </ActionIcon>
      <Card.Section>
        <Image src={"images/pancake.png"} style={{ padding: 10 }} alt="image" />
      </Card.Section>
      <Text size="xs" color="grey">
        {type}
      </Text>
      <Link href={"/detail" + "?id=" + pid} passHref>
        <Text size="md" weight={700} className={styles.nameNavigate}>
          {name}
        </Text>
      </Link>
      {/* Counting Star for rating */}
      {/* <Group>
        <CountingStar count={parseInt(rating)} />
        <Text>{"(" + String(rating) + ".0" + ")"}</Text>
      </Group> */}
      <Text size="xs" color="grey">
        {store_name}
      </Text>
      <Text size="xs" color="red">
        Ordered: {ordered}
      </Text>
      <Group position="apart">
        <Text weight={500}>${String(price) + ".00"}</Text>
        {/* {sale && (
          <Text size="sm" color="grey" strikethrough>
            ${String(preSale) + ".00"}
          </Text>
        )} */}
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
