import React, { useEffect, useState } from "react";
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
  Text,
} from "@mantine/core";
import MyStoreRegisterPage from "../MyStoreRegisterPage";
import { joiResolver, useForm } from "@mantine/form";
import { useRouter } from "next/router";
import PasswordStrength from "./shards/PasswordStrength";
import registerSchema from "./validate";
import styles from "./styles.module.scss";
import { accountRegister } from "@/lib/api/accounts";
import { TiTick } from "react-icons/ti";
import { HiLockClosed } from "react-icons/hi";
import { MdPerson, MdPhone, MdOutlineClose } from "react-icons/md";
import { showNotification } from "@mantine/notifications";
import { HiOutlineIdentification } from "react-icons/hi";
import Link from "next/link";

const RegisterPage = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    console.log("Customer", props);
  });

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      role_id: "CUS",
      id: makeid(10),
      timestamp: Date.now().toString(),
    },
    schema: joiResolver(registerSchema),
  });

  const handleToLogin = () => {
    router.replace("/customer/login");
  };

  const handleSubmit = async (values) => {
    setLoading(false);
    const [data, error] = await accountRegister(values);

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
          size="md"
          placeholder="ID"
          defaultValue={makeid(10)}
          hidden
          disabled
          {...form.getInputProps("id")}
        />
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

          {/* <Radio.Group
            //defaultValue={"CUS"}
            label="What is your role?"
            size="md"
            required
            {...form.getInputProps("role_id")}
          >
            <Radio value="CUS" label="Customer" checked="true" />
            <Radio value="SEL" label="Seller" />
          </Radio.Group> */}
          <Center>
            Already have an account?
            <Anchor onClick={handleToLogin} ml="xs">
              Login
            </Anchor>
          </Center>
          <Center>
            Cooperate with our team?
            <Anchor href={"/seller/register"} ml="xs">
              Seller
            </Anchor>
          </Center>
          <Button size="md" type="submit">
            Register
          </Button>
        </SimpleGrid>
        <LoadingOverlay visible={loading} />
      </Stack>
    </form>
  );
};

export default RegisterPage;
