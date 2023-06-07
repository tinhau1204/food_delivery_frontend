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
import { getProductType, getAllProductsType, editProductType } from "@/lib";
//import Image from "next/image";

const useStyles = createStyles((theme) => ({
  root: {
    marginLeft: 270,
    height: "100%",
    width: "30vw",
    paddingTop: 80,
    position: "sticky",
    zIndex: 1,
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
  tdcontent: {
    textAlign: "center",
    verticalAlign: "middle",
  },
}));

export default function MyStoreAllProductsTypePage() {
  const [typeArray, setTypeArray] = useState([]);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
  const store_id = savedCookie.storeId;

  // product info
  const [idProductType, setIdProductType] = useState("");
  const [nameType, setNameType] = useState("");

  // check if empty
  const [emptyName, setEmptyName] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  async function getAllProductTypesInfo() {
    try {
      const [response, error] = await getAllProductsType(store_id);

      if (response.length > 0) {
        setTypeArray(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getProductTypeInfo(id) {
    try {
      const [response, error] = await getProductType(id);

      const { name } = response[0];
      setNameType(name);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProductTypesInfo();
  }, []);

  async function editProductTypeInfo() {
    setLoading(true);
    // check if name is empty
    if (nameType === "") {
      setEmptyName(true);
      setLoading(false);
      return;
    }

    setEmptyName(false);

    try {
      const [response, error] = await editProductType(data);
      if (error) {
        alert(error);
        setLoading(false);
        return;
      }
      alert(response);
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
        <td className={classes.tdcontent}>
          <Text size="sm">{item.id}</Text>
        </td>
        <td className={classes.tdcontent}>
          <Text size="sm">{item.name}</Text>
        </td>
        <td className={classes.tdcontent}>
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
        <Table sx={{ minWidth: classes.root.width }} verticalSpacing="sm">
          <thead className={classes.thead}>
            <tr style={{ textAlign: "center" }}>
              <th style={{ width: "30%" }}>ID</th>
              <th>Name</th>
              <th style={{ width: "30%" }}>Action</th>
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

            <Button fullWidth onClick={editProductTypeInfo} loading={loading}>
              Edit Product Type
            </Button>
          </Paper>
        </Modal>
      </Paper>
    </div>
  );
}
