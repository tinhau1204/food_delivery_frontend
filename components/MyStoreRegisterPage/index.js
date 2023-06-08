import {
  TextInput,
  PasswordInput,
  Checkbox,
  Select,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Textarea,
  FileInput,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import image from "/public/images/default-thumbnail.jpg";
import { client, genRandonString } from "../../components/common";
import { useRouter } from "next/router";

export default function MyStoreRegisterPage(props) {
  const router = useRouter();

  // info of account
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [accountId, setAccountId] = useState("");

  // check if account info are empty
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  // check if repeat password is match
  const [match, setMatch] = useState(true);

  // store info
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(image);
  const [typeChosen, setTypeChosen] = useState("");

  // type of store
  const [typeStore, setTypeStore] = useState([]);

  // check if store info are empty
  const [emptyStoreName, setEmptyStoreName] = useState(false);
  const [emptyAddress, setEmptyAddress] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);
  const [emptyType, setEmptyType] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  // check if account is created successfully
  const [created, setCreated] = useState(false);
  useEffect(() => {
    console.log("Seller", props);
    const user_id = sessionStorage.getItem("TempUser");

    if (user_id != null) {
      setAccountId(user_id);
      setCreated(true);
      setLoading(false);
    }
  });

  // create account
  async function Register() {
    setLoading(true);
    // check all fields
    if (name === "" || email === "" || password === "") {
      if (name === "") {
        setEmptyName(true);
        console.log(emptyName);
      } else {
        setEmptyName(false);
      }
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
      setLoading(false);
      return;
    }
    if (password !== repeatPass) {
      setMatch(false);
      setLoading(false);
      return;
    }

    setMatch(true);
    setEmptyName(false);
    setEmptyEmail(false);
    setEmptyPassword(false);

    // create account
    const created_date = new Date().toISOString();
    const account_id = genRandonString();

    const data = {
      id: account_id,
      role_id: "SEL",
      name: name,
      email: email,
      password: password,
      created_date: created_date,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/account/register`,
        data,
      );

      if (response.data.error) {
        alert(response.data.error);
        setLoading(false);
      } else {
        alert(response.data.message);
        setCreated(true);
        setLoading(false);
        setAccountId(account_id);
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.error);
      setLoading(false);
    }
  }

  async function RegisterStore() {
    setLoading(true);
    // check all fields
    if (
      storeName === "" ||
      address === "" ||
      description === "" ||
      file === null ||
      typeChosen === ""
    ) {
      if (storeName === "") {
        setEmptyStoreName(true);
      } else {
        setEmptyStoreName(false);
      }
      if (address === "") {
        setEmptyAddress(true);
      } else {
        setEmptyAddress(false);
      }
      if (description === "") {
        setEmptyDescription(true);
      } else {
        setEmptyDescription(false);
      }
      if (file === null) {
        setEmptyImage(true);
      } else {
        setEmptyImage(false);
      }
      if (typeChosen === "") {
        setEmptyType(true);
      } else {
        setEmptyType(false);
      }
      setLoading(false);
      return;
    }

    setEmptyStoreName(false);
    setEmptyAddress(false);
    setEmptyDescription(false);
    setEmptyImage(false);
    setEmptyType(false);

    const storeId = genRandonString();
    const created_date = new Date().toISOString();

    // Send image into IPFS
    const fileAdded = await client.add(file);
    console.log(fileAdded.path);

    // Fetch NEXT_PUBLIC_API to create store
    try {
      const data = {
        id: storeId,
        owner_id: accountId,
        name: storeName,
        address: address,
        description: description,
        image: fileAdded.path,
        type_id: typeChosen,
        created_date: created_date,
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API + "/store/create",
        data,
      );
      if (response.data.error) {
        alert(response.data.error);
        setLoading(false);
      } else {
        alert(response.data.message);
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
      console.log(err);
    }
  }

  async function selectStoreType() {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API + "/store/get-all-type",
    );
    const types = response.data;
    let typeArray = [];

    for (let i = 0; i < types.length; i++) {
      let data = {
        value: "",
        label: "",
      };
      data.value = types[i].id;
      data.label = types[i].name;

      typeArray.push(data);
    }

    setTypeStore(typeArray);
  }

  useEffect(() => {
    selectStoreType();
  }, []);

  return (
    <Group position="center" className={styles.wrapper}>
      {!created ? (
        <Container size={420} my={40}>
          <Paper shadow="md" p={30} mt={30} radius="md">
            <Title
              align="center"
              variant="gradient"
              gradient={{ from: "#13a762", to: "cyan" }}
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Be Our Partner!
            </Title>
            <Text fz={13} align="center">
              First You Need To Create An Seller Account
            </Text>
            <TextInput
              label="Full name"
              placeholder="Nguyen Van A"
              mt="md"
              required
              onChange={(value) => setName(value.currentTarget.value)}
              error={emptyName}
            />
            {emptyName ? (
              <Text fz="xs" c="red">
                Name is required
              </Text>
            ) : (
              <></>
            )}
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              mt="md"
              icon={<IconAt size={14} />}
              onChange={(value) => setEmail(value.currentTarget.value)}
              error={emptyEmail}
            />
            {emptyEmail ? (
              <Text fz="xs" c="red">
                Email is required
              </Text>
            ) : (
              <></>
            )}
            <PasswordInput
              label="Password"
              placeholder="Your password"
              description="Must be longer than 8 letters, First uppercase letter, One special characters"
              required
              mt="md"
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
            <PasswordInput
              label="Repeat Password"
              placeholder="Repeat password"
              required
              mt="md"
              onChange={(value) => setRepeatPass(value.currentTarget.value)}
              error={!match}
            />
            {!match ? (
              <Text fz="xs" c="red">
                Repeat password does not match
              </Text>
            ) : (
              <></>
            )}
            <Text color="dimmed" size="sm" align="center" mt="md">
              Already has account?{" "}
              <Link href="/seller/login">
                <a className={styles.link}> Login </a>
              </Link>
            </Text>
            <Button fullWidth mt="xs" onClick={Register} loading={loading}>
              Continue
            </Button>
          </Paper>
        </Container>
      ) : (
        <Container size={420} my={40}>
          <Paper shadow="md" p={30} mt={30} radius="md">
            <Title
              align="center"
              variant="gradient"
              gradient={{ from: "#13a762", to: "cyan" }}
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Be Our Partner!
            </Title>
            <Text fz={13} align="center">
              Create Your Store!
            </Text>
            <TextInput
              value={storeName}
              label="Store name"
              placeholder="A Store"
              mt="md"
              required
              onChange={(value) => setStoreName(value.currentTarget.value)}
              error={emptyStoreName}
            />
            {emptyStoreName ? (
              <Text fz="xs" c="red">
                Store name is required
              </Text>
            ) : (
              <></>
            )}
            <TextInput
              value={address}
              label="Store address"
              placeholder="01 Vo Van Ngan"
              required
              mt="md"
              onChange={(value) => setAddress(value.currentTarget.value)}
              error={emptyAddress}
            />
            {emptyAddress ? (
              <Text fz="xs" c="red">
                Address is required
              </Text>
            ) : (
              <></>
            )}
            <Textarea
              label="Decription"
              placeholder="Your store Description"
              required
              mt="md"
              onChange={(value) => setDescription(value.currentTarget.value)}
              error={emptyDescription}
            />
            {emptyDescription ? (
              <Text fz="xs" c="red">
                Description is required
              </Text>
            ) : (
              <></>
            )}
            <Select
              label="Your store type"
              placeholder="Pick one"
              required
              searchable
              nothingFound="No options"
              mt="md"
              error={emptyType}
              data={typeStore}
              value={typeChosen}
              onChange={(value) => setTypeChosen(value)}
            />
            {emptyType ? (
              <Text fz="xs" c="red">
                Store Type is required
              </Text>
            ) : (
              <></>
            )}
            <FileInput
              label="Your store's image"
              placeholder="Pick an image of your store"
              required
              mt="md"
              error={emptyImage}
              value={file}
              onChange={(value) => {
                if (value) {
                  setFileUrl(URL.createObjectURL(value));
                  setFile(value);
                }
              }}
            />
            {emptyImage ? (
              <Text fz="xs" c="red">
                Image is required
              </Text>
            ) : (
              <></>
            )}
            <Group mt="md">
              <Image src={fileUrl} height={300} width={300} alt={""} />
            </Group>
            <Button fullWidth mt="xs" onClick={RegisterStore} loading={loading}>
              Create Store
            </Button>
          </Paper>
        </Container>
      )}
    </Group>
  );
}
