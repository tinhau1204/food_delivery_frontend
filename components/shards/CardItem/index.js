//import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  Card,
  ActionIcon,
  Text,
  Button,
  Group,
  Stack,
  Skeleton,
} from "@mantine/core";
//import { useDisclosure } from "@mantine/hooks";
//import StarRating, { CountingStar } from "./components/StarRating";
import { BiDetail } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import clsx from "classnames";
import { getCart, addToCart, updateCart } from "@/redux/cart";
import styles, { imgHeight, imgWidth } from "./styles.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, addToWishlist } from "@/redux/wishlist";
import Image from "next/image";
//import DetailPage from "@/components/DetailPage";
//const DetailPage = dynamic(() => import("@/components/DetailPage"));
import { useHover } from "@mantine/hooks";
import { useRouter } from "next/router";
import SelectDetail from "@/components/DetailPage/SelectDetail";

function CardItem({
  pid,
  type,
  name,
  price,
  stock,
  store_name,
  image,
  ordered,
  trending,
  loading,
  hidden,
  onClick,
}) {
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;
  const [addWishlist, setAddWishlist] = useState(false);
  const { wishlist } = useSelector(getWishlist);
  const { hovered, ref } = useHover();
  const [isFlipped, setIsFlipped] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  // Get card size = style scss
  const numbImgHeight = parseFloat(imgHeight.split("px")[0]);
  const numbImgWidth = parseFloat(imgWidth.split("px")[0]);
  //
  const { cart } = useSelector(getCart);
  const [quantity, setQuantity] = useState(1);

  const productData = { pid, type, name, price, store_name, image };

  const toggleWishlist = () => {
    setAddWishlist(!addWishlist);
    dispatch(addToWishlist(productData));
  };

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.pid === product.pid)) {
      var oldItem = cart.find((item) => item.pid === product.pid);
      var newItem = { ...oldItem, amount: oldItem.amount + quantity };
      dispatch(updateCart(newItem));
    } else {
      var newItem = { ...product, amount: quantity };
      dispatch(addToCart(newItem));
    }
  };

  return (
    <>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        className={styles.card}
      >
        {!hidden && (
          <div
            className={styles.cornerRibbon}
            style={{
              display: isFlipped ? "none" : "inline-block",
              visibility: loading ? "hidden" : "visible",
            }}
          >
            <div
              className={clsx(
                {
                  [styles.cornerRibbonChildHot]: trending == "hot",
                  [styles.cornerRibbonChildSale]: trending == "sale",
                  [styles.cornerRibbonChildNew]: trending == "new",
                },
                styles.cornerRibbonChild,
              )}
            >
              <Text size={14} color="white">
                {trending == "hot"
                  ? "Hot"
                  : trending == "sale"
                  ? "Sale"
                  : "New"}
              </Text>
            </div>
          </div>
        )}
        {!hidden && (
          <ActionIcon
            onClick={toggleWishlist}
            variant="transparent"
            style={{
              display: isFlipped ? "none" : "inline-block",
              visibility: loading ? "hidden" : "visible",
            }}
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
          className={styles.cardSection}
          style={{
            display: isFlipped ? "none" : "inline-block",
          }}
        >
          <Skeleton
            radius={5}
            w={numbImgWidth}
            h={numbImgHeight}
            visible={loading}
          >
            <div ref={ref} className={styles.imageFrontContainer}>
              <Image
                priority
                loader={({ src }) => src}
                src={
                  loading ? "/images/default-thumbnail.jpg" : img_load + image
                }
                alt="/images/default-thumbnail.jpg"
                width={numbImgWidth}
                height={numbImgHeight}
                className={styles.image}
                style={{
                  transform: hovered ? "scale(1.01)" : "scale(1)",
                  filter: hovered ? "blur(2px)" : "blur(0px)",
                  opacity: 0,
                }}
                onLoadingComplete={(img) => img.style.removeProperty("opacity")}
              />
              <Button
                variant="filled"
                className={styles.imageButton}
                style={{
                  display: hovered ? "block" : "none",
                  opacity: hovered ? 1 : 0,
                }}
                color="#156b43"
                onClick={() => router.push("/detail?id=" + pid)}
              >
                View Detail
              </Button>
            </div>
          </Skeleton>
        </Card.Section>

        {!isFlipped ? (
          <Stack spacing={5}>
            <div style={{ height: "50px" }}>
              <Text size={16} lineClamp={2} weight={500} color="#ffffffe3">
                {name}
              </Text>
            </div>
            <Skeleton radius={5} visible={loading}>
              <Group position="left">
                <Stack spacing={5} w={120}>
                  <Text
                    size={12}
                    color="#ffffffe3"
                    tt="capitalize"
                    sx={{ fontFamily: "Bahnschrift" }}
                  >
                    TYPE
                  </Text>
                  <div
                    className={styles.borderBox}
                    style={{
                      background: "#353a3c",
                    }}
                  >
                    <Text
                      size={14}
                      color="#00bfff"
                      tt="capitalize"
                      fw={400}
                      sx={{ fontFamily: "Bahnschrift" }}
                    >
                      {type}
                    </Text>
                  </div>
                </Stack>
                <Stack spacing={5} w={120}>
                  <Text
                    size={12}
                    color="#ffffffe3"
                    tt="capitalize"
                    sx={{ fontFamily: "Bahnschrift" }}
                  >
                    STORE
                  </Text>
                  <div
                    className={styles.borderBox}
                    style={{
                      background: "#353a3c",
                    }}
                  >
                    <Text
                      size={14}
                      align="center"
                      color="#ddddddf2"
                      tt="capitalize"
                      lineClamp={1}
                      sx={{ fontFamily: "Bahnschrift" }}
                    >
                      {store_name}
                    </Text>
                  </div>
                </Stack>
              </Group>
            </Skeleton>
            <Group className={styles.bottomSection} position="apart">
              <Skeleton
                width="fit-content"
                style={{ minWidth: "106px" }}
                radius={5}
                visible={loading}
              >
                <Text
                  pt={5}
                  size={32}
                  weight={600}
                  c="#ffffffe8"
                  sx={{ fontFamily: "Bahnschrift" }}
                >
                  ${price != undefined ? String(price) : String(0.0)}
                </Text>
              </Skeleton>
              <Skeleton width="fit-content" radius={5} visible={loading}>
                {!hidden ? (
                  <Button
                    className={styles.buttonAdd}
                    leftIcon={<BiDetail />}
                    variant="light"
                    color="teal"
                    onClick={() => setIsFlipped(true)}
                  >
                    Select
                  </Button>
                ) : (
                  <></>
                )}
              </Skeleton>
            </Group>
          </Stack>
        ) : (
          <div
            style={{
              transform: "rotateY(180deg)",
            }}
          >
            <div className={styles.imageBackContainer}>
              <Image
                priority
                loader={({ src }) => src}
                src={
                  loading ? "/images/default-thumbnail.jpg" : img_load + image
                }
                alt="/images/default-thumbnail.jpg"
                width={300}
                height={200}
                className={styles.image}
                style={{
                  border: "2px solid #27ca7e",
                }}
              />
            </div>
            <Stack
              justify="space-around"
              style={{
                position: "relative",
                height: "10.325rem",
                bottom: "14px",
              }}
            >
              <Stack spacing={1}>
                <Group
                  className={styles.borderBox}
                  style={{
                    margin: "auto",
                    background: "#25262b",
                    position: "relative",
                    bottom: "0.625rem",
                    border: "2px solid #27ca7e",
                  }}
                >
                  <Text
                    size={32}
                    weight={600}
                    c="#ffffffe8"
                    sx={{ fontFamily: "Bahnschrift" }}
                  >
                    ${price != undefined ? String(price) : String(0.0)}
                  </Text>
                </Group>
                <Group position="center" spacing={5}>
                  <Group
                    spacing={5}
                    className={styles.borderBox}
                    style={{
                      background: "#353a3c",
                    }}
                  >
                    <BsBoxSeam size={15} />
                    <Text
                      size={14}
                      align="center"
                      color="#dddddd"
                      tt="capitalize"
                    >
                      &nbsp;{stock != null ? stock : "0"}
                    </Text>
                  </Group>
                  <Group
                    spacing={5}
                    className={styles.borderBox}
                    style={{
                      background: "#353a3c",
                    }}
                  >
                    <AiOutlineShoppingCart size={15} />
                    <Text
                      size={14}
                      align="center"
                      color="#dddddd"
                      tt="capitalize"
                    >
                      &nbsp;{ordered != null ? ordered : "0"}
                    </Text>
                  </Group>
                </Group>
              </Stack>
              <Group position="apart">
                <Stack spacing={5}>
                  <Text
                    size={12}
                    color="#ffffffe3"
                    tt="capitalize"
                    sx={{ fontFamily: "Bahnschrift" }}
                  >
                    QUANTITY
                  </Text>
                  <SelectDetail
                    onclickquantity={(item) => setQuantity(item)}
                    customheight={40}
                    customwidth={50}
                  />
                </Stack>
              </Group>
              <Group position="apart" spacing={5}>
                <Button
                  color="teal"
                  variant="light"
                  style={{ width: "10.625rem", height: "2.1vw" }}
                  leftIcon={<AiOutlineShoppingCart size={15} />}
                  onClick={() =>
                    handleAddToCart({
                      ...productData,
                      pid: productData.pid,
                      amount: quantity,
                    })
                  }
                >
                  Add
                </Button>
                <Button
                  variant="light"
                  color="teal"
                  style={{ height: "2.1vw" }}
                  onClick={() => setIsFlipped(false)}
                >
                  <RiArrowGoBackFill size={15} />
                </Button>
              </Group>
            </Stack>
          </div>
        )}
      </Card>
    </>
  );
}

export default CardItem;
