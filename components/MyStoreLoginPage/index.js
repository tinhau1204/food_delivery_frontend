import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Group,
} from "@mantine/core";
//import Layout from "../components/_layout";
import Head from "next/head";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
//import Register from "./register";
//import ForgotPassword from "./forgot-password";
import Link from "next/link";
import axios from "axios";

export default function MyStoreLoginPage() {
  //const { Component, pageProps } = props;
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  useEffect(() => {
    //sessionStorage.removeItem("User");
    setLoading(true);
    if (sessionStorage.length > 0) {
      const user_id = sessionStorage.getItem("User");
      // @ts-ignore
      setUserId(user_id);
    }
    setLoading(false);
  });

  async function Login() {
    // check all fields
    if (email === "" || password === "") {
      if (email === "") {
        setEmptyEmail(true);
      } else {
        setEmptyEmail(false);
      }
      if (password === "") {
        setEmptyPassword(true);
      } else {
        setEmptyPassword(false);
      }
      return;
    }

    setEmptyEmail(false);
    setEmptyPassword(false);

    try {
      const data = {
        role_id: "SEL",
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/account/login`,
        data,
      );
      //console.log(response);
      const { error, message } = response.data;
      if (error) {
        alert(error);
      } else {
        if (response.data.storeId === 0) {
          sessionStorage.setItem("TempUser", response.data.userId);
          router.push("/mystore/register");
        } else {
          sessionStorage.setItem("User", response.data.userId);
          sessionStorage.setItem("Store", response.data.storeId);
          setUserId(response.data.userId);
          router.push("/mystore");
        }
      }
    } catch (err) {
      //@ts-ignore
      alert(err.response);
    }
  }

  return (
    <>
      <Head>
        <title>Food-Delivery</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <div className={styles.wrapper}>
        <Paper className={styles.form} radius={0} p={30}>
          <Title
            order={2}
            className={styles.title}
            align="center"
            mt="md"
            mb={50}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            weight={700}
          >
            Welcome back
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            onChange={(value) => setEmail(value.currentTarget.value)}
            error={emptyEmail}
          />
          {emptyEmail ? (
            <Text fz="xs" c="red">
              Name is required
            </Text>
          ) : (
            <></>
          )}
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            onChange={(value) => setPassword(value.currentTarget.value)}
            error={emptyPassword}
          />
          {emptyPassword ? (
            <Text fz="xs" c="red">
              Password is required
            </Text>
          ) : (
            <></>
          )}
          <Group position="apart" mt="lg">
            <Checkbox label="Keep me logged in" sx={{ lineHeight: 1 }} />
            <Link href="/mystore/forgot-password">
              <a className={styles.link}>Forgot password? </a>
            </Link>
          </Group>

          <Button fullWidth mt="xl" size="md" onClick={Login}>
            Login
          </Button>

          <Text align="center" mt="md">
            Don&apos;t have an account?{" "}
            <Link href="/mystore/register">
              <a className={styles.link}>Register </a>
            </Link>
          </Text>
        </Paper>
      </div>
    </>
  );

  // return (
  //   // @ts-ignore
  //   <>
  //     <Head>
  //       <title>Food-Delivery</title>
  //       <meta
  //         name="viewport"
  //         content="minimum-scale=1, initial-scale=1, width=device-width"
  //       />
  //     </Head>
  //     {loading ? (
  //       <> </>
  //     ) : (
  //       // : userId ? (
  //       //   <Layout>
  //       //     <MantineProvider
  //       //       withGlobalStyles
  //       //       withNormalizeCSS
  //       //       theme={{
  //       //         /** Put your mantine theme override here */
  //       //         colorScheme: "light",
  //       //       }}
  //       //     >
  //       //       <Component {...pageProps} />
  //       //     </MantineProvider>
  //       //   </Layout>
  //       // )
  //       // router.pathname === "/mystore/register" ? (
  //       //   <Register />
  //       // ) : router.pathname === "/mystore/forgot-password" ? (
  //       //   <ForgotPassword />
  //       // ) :
  //       //
  //       <Login />
  //     )}
  //   </>
  // );
}
