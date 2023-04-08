import {
  Button,
  createStyles,
  Group,
  Paper,
  Text,
  Stack,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { genRandonString } from "../common";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    height: "100%",
    marginLeft: 270,
    width: "22vw",
    position: "sticky",
    zIndex: 2,
  },

  textInput: {
    width: 400,
  },
  title: {
    color: theme.colors.gray[4],
    display: "flex",
    justifyContent: "center",
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
}));

export default function NewProductType() {
  const { classes } = useStyles();

  // product info
  const [nameProductType, setNameProductType] = useState("");

  // check if empty
  const [emptyName, setEmptyName] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  async function createProductType() {
    setLoading(true);
    if (nameProductType === "") {
      setEmptyName(true);
      setLoading(false);
      return;
    }
    setEmptyName(false);

    const store_id = sessionStorage.getItem("Store");
    const data = {
      id: genRandonString(),
      name: nameProductType,
      store_id: store_id,
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API + "/menu/new-product-type",
        data,
      );
      if (response) {
        alert(response.data.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      alert("Must be in lowercased with no special characters");
    }

    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <Paper w={350} p="sm" className={classes.titlePaper}>
        <Text
          className={classes.title}
          component="span"
          align="center"
          size={18}
          weight={650}
          style={{ fontFamily: "Segoe UI" }}
        >
          Product Type
        </Text>
      </Paper>
      <Paper
        p="xl"
        //radius="md"
        className={classes.contentPaper}
      >
        <TextInput
          styles={{ label: { fontSize: 13 } }}
          placeholder="Name of product's type"
          label="Lowercased with no special characters"
          w="100%"
          radius="md"
          withAsterisk
          className={classes.textInput}
          onChange={(value) => setNameProductType(value.currentTarget.value)}
          error={emptyName}
        ></TextInput>
        {emptyName ? (
          <Text fz="xs" c="red">
            Name is required
          </Text>
        ) : (
          <></>
        )}
        <Button mt="xl" fullWidth onClick={createProductType} loading={loading}>
          Create
        </Button>
      </Paper>
    </div>
  );
}
