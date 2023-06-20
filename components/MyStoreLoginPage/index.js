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
  Center,
  Group,
} from "@mantine/core";
//import Layout from "../components/_layout";
import Head from "next/head";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
//import Register from "./register";
//import ForgotPassword from "./forgot-password";
import Link from "next/link";
import { accountLogin } from "@/lib";

export default function MyStoreLoginPage() {
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

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

      const [response, error] = await accountLogin(data);
      if (error) {
        alert(Object.values(error)[0]);
      } else {
        if (response.storeId === 0) {
          sessionStorage.setItem("TempUser", response.userId);
          router.push("/seller/register");
        } else {
          var expireTime = new Date(Date.now() + 21600 * 1000).toUTCString();
          document.cookie = `Sel=${JSON.stringify(
            response,
          )};Expires=${expireTime};path=/;`;
          setUserId(response.userId);
          router.push("/mystore");
        }
      }
    } catch (err) {
      //@ts-ignore
      alert(err.response);
    }
  }

  return (
    <div>
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
            gradient={{ from: "#13a762", to: "cyan" }}
            weight={900}
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
            variant="filled"
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
            <Link
              href={{
                pathname: "/seller/register",
              }}
              shallow={true}
              style={{ color: "#61afef", fontSize: 13 }}
            >
              Create a new account?
            </Link>
          </Group>

          <Button fullWidth mt="xl" size="md" onClick={Login}>
            Login
          </Button>
          <Center style={{ paddingTop: "10px" }}>
            Want to browse and order ?
            <Link
              href="/customer/login"
              style={{ color: "#61afef", paddingLeft: "10px" }}
            >
              Customer
            </Link>
          </Center>
        </Paper>
      </div>
    </div>
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
