import React, { useEffect, useState } from "react";
import {
  Paper,
  Image,
  BackgroundImage,
  TextInput,
  Text,
  Container,
  Group,
  Stack,
  ActionIcon,
  PasswordInput,
  Checkbox,
  Button,
  Radio,
  Center,
} from "@mantine/core";
import styles from "./styles.module.scss";
import { BiUserCircle } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import loginSchema from "./validate";
import Link from "next/link";
import { useRouter } from "next/router";
import { assignUser } from "@/lib";
import { useDispatch } from "react-redux";
import { joiResolver, useForm } from "@mantine/form";
import { TiTick } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import { showNotification } from "@mantine/notifications";
import { login } from "@/redux/user";

export default function LoginPage() {
  const [isFocus, setIsFocus] = useState({ name: "", isActive: false });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      role_id: "",
    },
    schema: joiResolver(loginSchema),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("value", values);
    const [data, error] = await assignUser("/account/login", values);

    if (data) {
      showNotification({
        title: "Login success",
        message: "Welcome to Jobable 🚀",
        color: "green",
        icon: <TiTick color="white" />,
      });

      dispatch(login({ ...data }));

      router.push("/");
    }

    if (error) {
      showNotification({
        title: "Login error",
        message: error.error,
        icon: <MdOutlineClose color="white" />,
        color: "red",
      });
    }

    setLoading(false);
  };

  return (
    <form className={styles.container} onSubmit={form.onSubmit(handleSubmit)}>
      <Group>
        <Paper shadow="md" radius="lg" style={{ width: "50%" }}>
          <Image
            src="https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148692632.jpg?w=2000"
            width="100%"
            height="100vh"
            alt="background image"
            style={{ zIndex: 1 }}
          ></Image>
        </Paper>
        <Group
          style={{
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 1,
            zIndex: 2,
          }}
        >
          <Paper
            shadow="md"
            p="md"
            radius="md"
            withBorder
            style={{ width: 300, borderColor: "green" }}
          >
            <Text weight={700} size="xl" align="center">
              Login
            </Text>
            <Stack>
              <TextInput
                placeholder="Email"
                label="Email"
                icon={<BiUserCircle size={20} color="#27ca7d" />}
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                placeholder="Password"
                label="Password"
                icon={<HiLockClosed size={20} color="#27ca7d" />}
                required
                {...form.getInputProps("password")}
              />
              <Center>
                <Radio.Group
                  defaultValue="CUS"
                  size="md"
                  color="#253d4e"
                  required
                  {...form.getInputProps("role_id")}
                >
                  <Radio value="CUS" label="Customer" />
                  <Radio value="SEL" label="Seller" />
                </Radio.Group>
              </Center>
              <Button variant="outline" color="teal" type="submit">
                Login
              </Button>
              <Link href="/register" passhref>
                <Text variant="link" component="a" align="left" size="sm">
                  Create a new account?
                </Text>
              </Link>
            </Stack>
          </Paper>
        </Group>
      </Group>
    </form>
  );
}
