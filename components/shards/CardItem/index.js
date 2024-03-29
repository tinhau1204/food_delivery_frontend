import React, { useState, useEffect } from "react";
import { Card, Image, ActionIcon, Text, Group, Button } from "@mantine/core";
//import StarRating, { CountingStar } from "./components/StarRating";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import clsx from "classnames";
import styles from "./styles.module.scss";
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
  const cardHeight = styles.card.height;
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
        border: "2px solid #25262bb5",
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
          marginTop: "0.2rem",
          padding: "1.7rem 1.2rem 1.7rem 0.9rem",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            width: 208,
            height: 208,
            border: "1px solid #25262bb5",
            borderRadius: 5,
          }}
        >
          <Image
            src={img_load + image}
            alt="image"
            width="100%"
            height="100%"
            styles={{
              root: { height: "100%" },
              figure: { width: "100%", height: "100%" },
              imageWrapper: { width: "100%", height: "100%" },
              objectFit: "cover",
            }}
          />
        </div>
      </Card.Section>
      {/* <Text size="xs" color="grey">
        {type}
      </Text> */}
      <Link href={"/detail" + "?id=" + pid} passhref>
        <Text size="md" weight={650} className={styles.nameNavigate}>
          {name}
        </Text>
      </Link>
      <Group position="apart" pt={14}>
        <Text size={13} weight={500} color="grey">
          {store_name}
        </Text>
        {!hidden && (
          <Text size={13} weight={500} color="red">
            Ordered {ordered != null ? ordered : "0"}
          </Text>
        )}
      </Group>
      <Group position="apart" pt={2}>
        <Text size={18} weight={500}>
          ${String(price)}
        </Text>
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
