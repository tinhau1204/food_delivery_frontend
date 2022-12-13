import styles from "./styles.module.scss";
import { TbPhoneCall } from "react-icons/tb";
import React from "react";
import { Container, Group, Stack, Text } from "@mantine/core";

function Contact({ phoneNumber, dateTime }) {
  return (
    <Group spacing="xs">
      <TbPhoneCall size={30} color="grey" />
      <Stack spacing="none">
        <Text color="grey" size="lg" fw={700}>
          {phoneNumber}
        </Text>
        <Text color="grey" size="xs">
          {dateTime}
        </Text>
      </Stack>
    </Group>
  );
}

export default Contact;
