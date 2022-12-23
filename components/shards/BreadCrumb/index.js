import React from "react";
import styles from "./styles.module.scss";
import {
  Paper,
  BackgroundImage,
  Text,
  Stack,
  BreadCrumbs,
  Anchor,
  Title,
  Group,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import {
  FaHome,
  FaUserFriends,
  FaStore,
  FaShoppingCart,
  FaCashRegister,
  FaDollarSign,
  FaImage,
  FaHeart,
} from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

function BreadCrumb({ name }) {
  const router = useRouter();
  const itemPath = [
    { title: "Home", href: "/", icon: <FaHome size={40} /> },
    { title: "Login", href: "/login" },
    { title: "Register", href: "/register" },
    { title: "About Us", href: "/about", icon: <FaUserFriends size={40} /> },
    { title: "Food Store", href: "/store", icon: <FaStore size={40} /> },
    { title: "Cart", href: "/cart", icon: <FaShoppingCart size={40} /> },
    {
      title: "Check Out",
      href: "/checkout",
      icon: <FaCashRegister size={40} />,
    },
    {
      title: "Store detail",
      href: "/store/detail",
      icon: <FaStore size={40} />,
    },
    { title: "Food Detail", href: "/detail", icon: <FaDollarSign size={40} /> },
    { title: "WishList", href: "/wishlist", icon: <FaHeart size={40} /> },
    { title: "Upload Image", href: "/uploadimg", icon: <FaImage size={40} /> },
  ];

  const items = itemPath
    .filter((item, index) => item.href === router.pathname)
    .map((item, index) => (
      <Group key={index} align="center">
        {item.icon}
        <Text key={index} color="white">
          {item.title}
        </Text>
      </Group>
    ));
  return (
    <Paper p="lg" className={styles.wrapper}>
      <Group align="center" spacing="none">
        <ActionIcon
          variant="transparent"
          ml={100}
          onClick={() => router.back()}
          disabled={router.pathname == "/" && true}
        >
          <BiArrowBack
            size={20}
            color={router.pathname == "/" ? "ccc" : "#253d4e"}
          />
        </ActionIcon>
        <Stack
          style={{
            height: "100%",
            paddingLeft: router.pathname === "/checkout" ? 230 : 110,
          }}
          justify="center"
        >
          <Title color="#27ca7d">{items}</Title>
        </Stack>
      </Group>
    </Paper>
  );
}

export default BreadCrumb;
