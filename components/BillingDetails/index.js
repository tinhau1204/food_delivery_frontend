import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Group,
  Text,
  Title,
  TextInput,
  SimpleGrid,
  Radio,
  Button,
  Anchor,
  Center,
  Container,
  Stack,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import checkoutSchema from "./validate";
import { TiTick } from "react-icons/ti";
import { MdPerson, MdPhone, MdOutlineClose } from "react-icons/md";
import { showNotification } from "@mantine/notifications";
import CardTotal from "./shards/CardTotal";
function BillingDetails({ opened, closed }) {
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState("");
  // const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      surname: "",
      company: "",
      country: "",
      city: "",
      email: "",
      phoneNumber: "",
      zipcode: "",
    },
    schema: joiResolver(checkoutSchema),
  });

  const handleSubmit = async (values) => {
    setLoading(false);
    const [data, error] = await assignUser("/user/register", values);

    if (data) {
      showNotification({
        title: "Register success",
        message: "Welcome to Jobable 🚀",
        color: "green",
        icon: <TiTick color="white" />,
      });
      router.push("/order");
    }

    if (error) {
      showNotification({
        title: "Register error",
        color: "red",
        message: error.message,
        icon: <MdOutlineClose color="white" />,
      });
    }

    setLoading(false);
  };
  return (
    <Modal opened={opened} onClose={() => closed()} size="auto">
      <Group position="center" align="flex-start" pt={20}>
        <form
          className={styles.container}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Stack spacing="xl" className={styles.stack}>
            <Title className={styles.title}>Billing Details</Title>
            <Text className={styles.subTitle} size="sm">
              Enter your details
            </Text>
            {/* <Group>

                  </Group> */}
            <SimpleGrid
              cols={2}
              spacing="xl"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <TextInput
                label="Name"
                size="md"
                placeholder="Name"
                required
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Surname"
                size="md"
                placeholder="Surname"
                required
                {...form.getInputProps("surname")}
              />
              <TextInput
                label="Company"
                size="md"
                placeholder="Company"
                required
                {...form.getInputProps("company")}
              />
              <TextInput
                label="Country"
                size="md"
                placeholder="Country"
                required
                {...form.getInputProps("country")}
              />
              <TextInput
                label="City"
                type="tel"
                size="md"
                placeholder="City"
                required
                {...form.getInputProps("city")}
              />
              <TextInput
                label="E-mail"
                type="tel"
                size="md"
                placeholder="E-mail"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Phone number"
                type="tel"
                size="md"
                placeholder="Phone number"
                required
                {...form.getInputProps("phoneNumber")}
              />
              <TextInput
                label="Zip Code"
                type="tel"
                size="md"
                placeholder="Zip Code"
                required
                {...form.getInputProps("zipcode")}
              />
            </SimpleGrid>
            <Button size="md" type="submit" color="teal">
              Complete Order
            </Button>

            <LoadingOverlay visible={loading} />
          </Stack>
        </form>
        <Stack
          justify="flex-start"
          align="flex-start"
          style={{ height: "100%" }}
        >
          <Title className={styles.title}>Card Details</Title>
          <Text className={styles.subTitle} size="sm">
            you have {totalItem}{" "}
            {Number(totalItem) < 2 ? "product" : "products"} in card
          </Text>
          <CardTotal countItem={(val) => setTotalItem(val)} />
        </Stack>
      </Group>
    </Modal>
  );
}

export default BillingDetails;
