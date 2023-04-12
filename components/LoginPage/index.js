import React, { useEffect, useState } from "react";
import {
  Paper,
  Image,
  //BackgroundImage,
  TextInput,
  Text,
  //Container,
  Group,
  Stack,
  //ActionIcon,
  PasswordInput,
  //Checkbox,
  Button,
  Center,
} from "@mantine/core";
import MyStoreLoginPage from "../MyStoreLoginPage";
import styles from "./styles.module.scss";
import { BiUserCircle } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
//import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import loginSchema from "./validate";
import Link from "next/link";
import { useRouter } from "next/router";
import { accountLogin } from "@/lib/api/accounts";
import { useDispatch } from "react-redux";
import { joiResolver, useForm } from "@mantine/form";
import { TiTick } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import { showNotification } from "@mantine/notifications";
import { login } from "@/redux/user";
import { boolean } from "joi";

export default function LoginPage(props) {
  // const [isFocus, setIsFocus] = useState({ name: "", isActive: false });
  // const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      role_id: "CUS",
    },
    schema: joiResolver(loginSchema),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const [data, error] = await accountLogin(values);
    if (data) {
      showNotification({
        autoClose: 4000,
        title: "Login success",
        message: "Welcome to Food Delivery 🚀",
        color: "green",
        icon: <TiTick color="white" />,
      });

      dispatch(login({ ...data }));
      var expireTime = new Date(Date.now() + 21600 * 1000).toUTCString();
      document.cookie = `Cus=${JSON.stringify(
        data,
      )};Expires=${expireTime};path=/;`;
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
    <div>
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
              style={{ width: 300, borderColor: "#27ca7d" }}
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
                <a
                  style={{ color: "#61afef", fontSize: 13 }}
                  onClick={() => toRegister()}
                >
                  Create a new account?
                </a>
                <Button variant="outline" color="teal" type="submit">
                  Login
                </Button>
                <Center>
                  Cooperate with our team?
                  <Link href="/seller/login">
                    <a style={{ color: "#61afef", paddingLeft: "10px" }}>
                      Seller
                    </a>
                  </Link>
                </Center>
              </Stack>
            </Paper>
          </Group>
        </Group>
      </form>
    </div>
  );
}
