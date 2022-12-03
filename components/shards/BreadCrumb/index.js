import React from "react";
import styles from "./styles.module.scss";
import {
  Paper,
  BackgroundImage,
  Text,
  Stack,
  BreadCrumbs,
  Anchor,
} from "@mantine/core";
import Link from "next/link";

function BreadCrumb() {
  const items = [{ title: "Home", href: "/" }].map((item, index) => (
    <Anchor href={item.href} key={index} color="teal">
      {item.title}
    </Anchor>
  ));

  return (
    <BackgroundImage
      src="https://www.wallpaperflare.com/static/60/963/816/minimalism-food-illustrations-blue-wallpaper-preview.jpg"
      style={{ height: 200, width: "100%" }}
    >
      <Stack style={{ marginLeft: 100, height: "100%" }} justify="center">
        <Text size="xl" weight={700}>
          Vegetables
        </Text>
        {items}
      </Stack>
    </BackgroundImage>
  );
}

export default BreadCrumb;
