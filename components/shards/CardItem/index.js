import React, { useState, useEffect } from "react";
import {
  Card,
  Image,
  ActionIcon,
  Text,
  Button,
  Group,
  Stack,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
//import StarRating, { CountingStar } from "./components/StarRating";
import { BiDetail } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import clsx from "classnames";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, addToWishlist } from "@/redux/wishlist";
import DetailPage from "@/components/DetailPage";
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
  hidden,
  onClick,
}) {
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;
  const [addWishlist, setAddWishlist] = useState(false);
  const { wishlist } = useSelector(getWishlist);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const cardHeight = 400;
  const cardWidth = 280;
  const imgHeight = cardHeight - 210;
  const imgWidth = cardWidth - 40;

  const toggleWishlist = () => {
    setAddWishlist(!addWishlist);
    dispatch(
      addToWishlist({ pid, type, name, price, store_name, image, ordered }),
    );
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <DetailPage product_id={pid} />
      </Modal>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        style={{
          width: cardWidth,
          //minHeight: name.length > 27 ? cardHeight + 20 : cardHeight,
          minHeight: cardHeight,

          border: "2px solid #25262bb5",
        }}
        className={styles.card}
      >
        {!hidden && (
          <div className={styles.cornerRibbon}>
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
            width: imgWidth,
            height: imgHeight - 5,
            padding: "1.7rem 1.2rem 1.7rem 0.9rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: imgWidth,
              height: imgHeight,
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
        <Link href={"/detail" + "?id=" + pid} passhref>
          <Text
            size="md"
            weight={500}
            className={styles.nameNavigate}
            h="2.555rem"
          >
            {name}
          </Text>
        </Link>
        <Stack spacing={10}>
          <Group position="apart">
            <Text
              size={13}
              weight={500}
              pl={8}
              pr={8}
              pt={3}
              pb={3}
              align="center"
              color="grey"
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
              }}
            >
              {type}
            </Text>
            <Text
              size={13}
              weight={500}
              pl={8}
              pr={8}
              pt={3}
              pb={3}
              align="center"
              color="grey"
            >
              {store_name}
            </Text>
          </Group>
          <Group position="apart" spacing={1} mb={1}>
            <Text
              size={13}
              weight={500}
              color="#67bcee"
              pl={8}
              pr={8}
              pt={3}
              pb={3}
              align="center"
              style={{
                width: "48%",
                border: "1px solid #67bcee",
                borderRadius: "5px",
              }}
            >
              Stock &nbsp; {stock}
            </Text>
            {!hidden && (
              <Text
                size={13}
                weight={500}
                color="#27ca7d"
                pl={8}
                pr={8}
                pt={3}
                pb={3}
                align="center"
                style={{
                  width: "48%",
                  border: "1px solid #27ca7d",
                  borderRadius: "5px",
                }}
              >
                Ordered &nbsp; {ordered != null ? ordered : "0"}
              </Text>
            )}
          </Group>
        </Stack>
        <Group
          position="apart"
          style={{
            position: "relative",
            top: "10px",
          }}
        >
          <Text
            pt={5}
            size={34}
            weight={600}
            style={{
              fontFamily: "Bahnschrift",
            }}
          >
            ${String(price)}
          </Text>
          {!hidden ? (
            <Button
              className={styles.buttonAdd}
              leftIcon={<BiDetail />}
              variant="light"
              color="teal"
              onClick={open}
            >
              Choose
            </Button>
          ) : (
            <></>
          )}
        </Group>
      </Card>
    </>
  );
}

export default CardItem;
