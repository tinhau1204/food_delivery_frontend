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
} from "@mantine/core";
import styles from "./styles.module.scss";
import { BiUserCircle } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isFocus, setIsFocus] = useState({ name: "", isActive: false });
  const [eyeVisible, setEyeVisible] = useState(false);
  // useEffect(() => {
  //   console.log('username >>', username);
  //   //console.log('password >>', password);
  // },[username, password]);
  return (
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
              placeholder="Username"
              label="username"
              icon={
                <BiUserCircle
                  size={20}
                  color={
                    isFocus.name === "username" && isFocus.isActive
                      ? "green"
                      : "#ccc"
                  }
                />
              }
              required={!username ? true : false}
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              onFocus={() => setIsFocus({ name: "username", isActive: true })}
              // styles={{input: {boderColor: 'green'}}}
            />
            <PasswordInput
              placeholder="Password"
              label="password"
              icon={
                <HiLockClosed
                  size={20}
                  color={
                    isFocus.name === "password" && isFocus.isActive
                      ? "green"
                      : "#ccc"
                  }
                />
              }
              onChange={(e) => setPassword(e.target.value)}
              required={!password ? true : false}
              value={password}
              onFocus={() => setIsFocus({ name: "password", isActive: true })}
            />
            <Checkbox label="Remember me" />
            <Button variant="outline" color="green">
              Login
            </Button>
            <Text variant="link" component="a" href="#" align="center">
              Forgot your password?
            </Text>
            <Text
              variant="link"
              component="a"
              href="/register"
              align="left"
              size="sm"
            >
              Create a new account?
            </Text>
          </Stack>
        </Paper>
      </Group>
    </Group>
  );
}
