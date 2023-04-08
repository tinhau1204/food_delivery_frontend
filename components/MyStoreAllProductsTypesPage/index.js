import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  useMantineTheme,
  Group,
  Modal,
  Text,
  Paper,
  Button,
  FileInput,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Image,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import axios from "axios";
import { client } from "../common";
//import Image from "next/image";

const useStyles = createStyles((theme) => ({
  root: {
    marginLeft: 270,
    height: "100%",
    width: "80vw",
    paddingTop: 80,
  },
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 40,
  },
  titlePaper: {
    backgroundColor: "#25262b",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  contentPaper: {
    backgroundColor: "#121216",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
  thead: {
    background: "#27ca7e91",
  },
  textInput: {
    width: 400,
  },
}));

export default function TableSelection() {
  const [typeArray, setTypeArray] = useState([]);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const store_id = sessionStorage.getItem("Store");

  // product info
  const [idProductType, setIdProductType] = useState("");
  const [nameType, setNameType] = useState("");

  // check if empty
  const [emptyName, setEmptyName] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  async function getAllProductTypes() {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API + "/menu/get-all-product-type/" + store_id,
      );

      if (response.data.length > 0) {
        setTypeArray(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getProductTypeInfo(id) {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API + "/menu/get-product-type/" + id,
      );

      const { name } = response.data[0];
      setNameType(name);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProductTypes();
  }, []);

  async function editProductType() {
    setLoading(true);
    // check if name is empty
    if (nameType === "") {
      setEmptyName(true);
      setLoading(false);
      return;
    }

    setEmptyName(false);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API + "/menu/edit-product-type",
        data,
      );
      if (response.data.error) {
        alert(response.data.error);
        setLoading(false);
        return;
      }
      alert(response.data.message);
    } catch (err) {
      setLoading(false);
      alert(err);
    }

    setLoading(false);
  }

  const rows = typeArray.map((item) => {
    const Icon = IconEdit;
    return (
      <tr key={item.id}>
        <td>
          <Group spacing="sm">
            <Text size="sm">{item.id}</Text>
          </Group>
        </td>
        <td>
          <Text size="sm">{item.name}</Text>
        </td>
        <td>
          <Button
            variant="default"
            onClick={() => {
              setOpened(true);
              setIdProductType(item.id);
              getProductTypeInfo(item.id);
            }}
          >
            <Icon size={22} stroke={1.5} />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className={classes.root}>
      <Paper
        p="xl"
        //radius="md"
        className={classes.contentPaper}
      >
        <Text
          className={classes.title}
          component="span"
          align="center"
          size={18}
          weight={650}
          style={{ fontFamily: "Segoe UI" }}
        >
          All products types
        </Text>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead className={classes.thead}>
            <tr style={{ textAlign: "center" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Modal
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={opened}
          size="auto"
          onClose={() => setOpened(false)}
        >
          <Paper>
            <Text
              className={classes.title}
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: "#13a762", to: "#27ca7d", deg: 45 }}
              size="xl"
              weight={700}
              style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >
              EDIT PRODUCT TYPE
            </Text>
            <Group position="center" mb={50}>
              <Paper ml={40}>
                <TextInput
                  placeholder="What is your product's name?"
                  label="Name of the product"
                  radius="md"
                  withAsterisk
                  value={nameType}
                  className={classes.textInput}
                  onChange={(value) => setNameType(value.currentTarget.value)}
                  error={emptyName}
                ></TextInput>
                {emptyName ? (
                  <Text fz="xs" c="red">
                    Name is required
                  </Text>
                ) : (
                  <></>
                )}
              </Paper>
            </Group>

            <Button fullWidth onClick={editProductType} loading={loading}>
              Edit Product Type
            </Button>
          </Paper>
        </Modal>
      </Paper>
    </div>
  );
}
