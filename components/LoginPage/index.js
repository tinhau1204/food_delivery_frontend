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
import { SlArrowLeft } from "react-icons/sl";
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
import AlertPopup from "../shards/AlertPopup";

export default function LoginPage(props) {
  // const [isFocus, setIsFocus] = useState({ name: "", isActive: false });
  // const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [isSelLogin, setIsSelLogin] = useState(false);
  useEffect(() => {
    if (document.cookie.indexOf("Sel") > -1) {
      setIsSelLogin(true);
    } else setIsSelLogin(false);
  }, []);

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
      {isSelLogin ? (
        <AlertPopup
          Title={"Signout Required"}
          Content={"You need to logout your current seller account first!"}
          LinkRef={"/mystore"}
          ButtonName={"Navigate"}
        />
      ) : (
        ""
      )}

      <form className={styles.container} onSubmit={form.onSubmit(handleSubmit)}>
        <Group
          style={{
            filter: isSelLogin ? "blur(8px)" : "blur(0px)",
            "-webkit-filter": isSelLogin ? "blur(8px)" : "blur(0px)",
          }}
        >
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
            <Group position="apart" spacing="xs" w={300}>
              <Group position="left" spacing={10}>
                <Paper
                  shadow="md"
                  p={8}
                  radius="md"
                  withBorder
                  style={{ width: 120, borderColor: "#27ca7d" }}
                >
                  <Group position="center" spacing={10}>
                    <Paper
                      p={12}
                      radius="md"
                      style={{ width: "min-content", background: "#27ca7e91" }}
                    />
                    <Paper
                      p={12}
                      radius="md"
                      style={{ width: "min-content", background: "#20a86991" }}
                    />
                    <Paper
                      p={12}
                      radius="md"
                      style={{ width: "min-content", background: "#156b43" }}
                    />
                  </Group>
                </Paper>
              </Group>
              <Link href="/">
                <Button
                  href="/"
                  style={{
                    width: "max-content",
                    height: "44px",
                    background: "#27ca7e91",
                  }}
                >
                  <SlArrowLeft
                    size={18}
                    color="white"
                    style={{ marginRight: "10px" }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontFamily: " Bahnschrift",
                    }}
                  >
                    Homepage
                  </Text>
                </Button>
              </Link>
            </Group>
            <Stack>
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
                  <Link href="/customer/register">
                    <a style={{ color: "#61afef", fontSize: 13 }}>
                      Create a new account?
                    </a>
                  </Link>
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
            </Stack>
          </Group>
        </Group>
      </form>
    </div>
  );
}
