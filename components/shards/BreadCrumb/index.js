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
} from "@mantine/core";
import Link from "next/link";
import Router, { useRouter } from "next/router";

function BreadCrumb({ name }) {
  const router = useRouter();
  const itemPath = [
    { title: "Home", href: "/" },
    { title: "Login", href: "/login" },
    { title: "Register", href: "/register" },
    { title: "About Us", href: "/about" },
    { title: "Food Store", href: "/store" },
    { title: "Cart", href: "/cart" },
    { title: "Check Out", href: "/checkout" },
    { title: "Food Detail", href: "/detail" },
  ];

  const items = itemPath
    .filter((item, index) => item.href === router.pathname)
    .map((item, index) => (
      <Text key={index} underline color="teal">
        {item.title}
      </Text>
    ));
  return (
    <Paper p="lg" className={styles.wrapper}>
      <Stack
        style={{
          height: "100%",
          paddingLeft: router.pathname === "/checkout" ? 230 : 110,
        }}
        justify="center"
      >
        <Title color="#27ca7d">{items}</Title>
      </Stack>
    </Paper>
  );
}

export default BreadCrumb;
