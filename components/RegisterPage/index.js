import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Center,
  Button,
  Anchor,
  LoadingOverlay,
  Title,
  Stack,
  Radio,
  SimpleGrid,
} from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { useRouter } from "next/router";
import PasswordStrength from "./shards/PasswordStrength";
import registerSchema from "./validate";
import styles from "./styles.module.scss";
import { assignUser } from "@/lib/api/user";
import { TiTick } from "react-icons/ti";
import { HiLockClosed } from "react-icons/hi";
import { MdPerson, MdPhone, MdOutlineClose } from "react-icons/md";
import { showNotification } from "@mantine/notifications";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      // confirmPassword: "",
      role_id: "CUS",
      timestamp: Date.now().toString(),
    },
    schema: joiResolver(registerSchema),
  });

  const handleToLogin = () => {
    router.replace("/login");
  };

  const handleSubmit = async (values) => {
    setLoading(false);
    console.log(typeof values);
    const [data, error] = await assignUser("/account/register", values);

    if (data) {
      showNotification({
        title: "Register success",
        message: "Welcome to Jobable 🚀",
        color: "green",
        icon: <TiTick color="white" />,
      });
      router.push("/login");
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
    <form className={styles.container} onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="xl" className={styles.stack}>
        <Title>🚀 Register</Title>
        <TextInput
          label="Email"
          size="md"
          icon={<MdPerson />}
          placeholder="Email"
          required
          {...form.getInputProps("email")}
        />
        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Name"
            size="md"
            icon={<MdPerson />}
            placeholder="Name"
            required
            {...form.getInputProps("name")}
          />
          <PasswordStrength {...form.getInputProps("password")} />
          {/* <PasswordInput
            label="Confirm password"
            size="md"
            icon={<HiLockClosed />}
            placeholder="Confirm password"
            required
            {...form.getInputProps("confirmPassword")}
          /> */}
          <Radio.Group
            defaultValue="Customer"
            label="What is your role?"
            size="md"
            required
            {...form.getInputProps("role_id")}
          >
            <Radio value="CUS" label="Customer" />
            <Radio value="SEL" label="Seller" />
          </Radio.Group>
          <Button size="md" type="submit">
            Register
          </Button>
          <Center>
            Already have an account?
            <Anchor onClick={handleToLogin} ml="xs">
              Login
            </Anchor>
          </Center>
        </SimpleGrid>
        <LoadingOverlay visible={loading} />
      </Stack>
    </form>
  );
};

export default RegisterPage;
