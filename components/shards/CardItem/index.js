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
  hidden,
  onClick,
}) {
  const [addWishlist, setAddWishlist] = useState(false);
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;
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
      {!hidden && (
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
      )}
      {!hidden && (
        <ActionIcon
          style={{ position: "absolute" }}
          onClick={toggleWishlist}
          variant="transparent"
          className={styles.rightSection}
          color={wishlist.find((item) => item.pid === pid) ? "red" : "gray"}
        >
          {wishlist.find((item) => item.pid === pid) ? (
            <AiFillHeart size={25} />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </ActionIcon>
      )}
      <Card.Section
        style={{
          width: 200,
          height: 200,
          padding: "1.7rem 1.2rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            width: 208,
            height: 208,
            border: "1px solid #ccc",
            borderRadius: 3,
          }}
        >
          <Image
            src={img_load + image}
            alt="image"
            width="100%"
            height="100%"
            styles={{
              figure: { width: "100%", height: "100%" },
              imageWrapper: { width: "100%", height: "100%" },
              objectFit: "cover",
            }}
          />
        </div>
      </Card.Section>
      <Text size="xs" color="grey">
        {type}
      </Text>
      <Link href={"/detail" + "?id=" + pid} passhref>
        <Text size="md" weight={700} className={styles.nameNavigate}>
          {name}
        </Text>
      </Link>
      <Text size="xs" color="grey">
        {store_name}
      </Text>
      <Text size="xs" color="red">
        Ordered: {ordered}
      </Text>
      <Group position="apart">
        <Text weight={500}>${String(price)}</Text>
        {!hidden ? (
          <Button
            className={styles.buttonAdd}
            leftIcon={<BsCartPlus />}
            variant="light"
            color="teal"
            onClick={onClick}
          >
            Add
          </Button>
        ) : (
          <></>
        )}
      </Group>
    </Card>
  );
}

export default CardItem;
