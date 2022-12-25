import Link from "next/link";
import { Container, Group, Text, ActionIcon } from "@mantine/core";
import styles from "./styles.module.scss";
import { useState } from "react";
import clsx from "classnames";
import { useRouter } from "next/router";
// import useRouter from

export default function MainMenu({ data }) {
  const { pathname } = useRouter();
  return (
    <Group>
      {data.map((item, index) => (
        <Container key={index}>
          <Link href={item.path} passhref>
            <Text
              className={clsx(styles.text)}
              weight={600}
              color={item.path === pathname && "teal"}
            >
              {item.title}
            </Text>
          </Link>
        </Container>
      ))}
    </Group>
  );
}

export function ListIcon({ data }) {
  // use ActionIcon
  return (
    <Group spacing="xs" align="flex-start">
      {data.map((item, index) => (
        <Container key={index} px={0}>
          <ActionIcon
            variant="transparent"
            component="a"
            href={item.path}
            passhref
            target="_blank"
            color="#253d4e"
          >
            {/* <Link href={item.path} passhref> */}
            {item.icon}
            {/* </Link> */}
          </ActionIcon>
        </Container>
      ))}
    </Group>
  );
}
