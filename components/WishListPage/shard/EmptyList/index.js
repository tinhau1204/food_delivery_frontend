import { Button, Container, Stack, Text } from "@mantine/core";
import React from "react";
import styles from "./styles.module.scss";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
function EmptyList() {
  return (
    <Stack>
      <Text>
        There is nothing in your
        <span style={{ color: "teal" }}> WishList!</span>
      </Text>
      <Button color="teal" rightIcon={<HiArrowLeft />}>
        <Link href="/">Back to shopping</Link>
      </Button>
    </Stack>
  );
}

export default EmptyList;
