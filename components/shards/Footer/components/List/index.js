import React from "react";
import {
  Container,
  Text,
  Stack,
  Group,
  Center,
  Box,
  Space,
} from "@mantine/core";
import Link from "next/link";
export default function List({ data }) {
  return (
    <Container px={0}>
      {data.map((item, index) => (
        <Container key={index} px={0}>
          <Group spacing="xs">
            {item.icon}
            <Box ml={item.space}>{item.title}</Box>
          </Group>
          <Space h="md" />
        </Container>
      ))}
    </Container>
  );
}

export function HorizontalList({ data }) {
  return (
    <Stack>
      {data.map((item, index) => (
        <Container key={index}>
          {index === 0 ? (
            <Center>
              <Text weight={700} color="#050A30">
                {item.title}
              </Text>
            </Center>
          ) : (
            <Center>
              <Link href={item.path} passHref>
                <Text component="a" color="#ccc">
                  {item.title}
                </Text>
              </Link>
            </Center>
          )}
        </Container>
      ))}
    </Stack>
  );
}
