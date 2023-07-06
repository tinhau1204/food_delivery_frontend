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
import { createProductType } from "@/lib";

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
  contentPaper: {
    backgroundColor: "#25262b",
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

  async function createProductTypeInfo() {
    setLoading(true);
    if (nameProductType === "") {
      setEmptyName(true);
      setLoading(false);
      return;
    }
    setEmptyName(false);

    const savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
    const store_id = savedCookie.storeId;
    const data = {
      id: genRandonString(),
      name: nameProductType,
      store_id: store_id,
    };

    try {
      const [response, error] = await createProductType(data);
      if (error) {
        alert(Object.values(error)[0]);
        setLoading(false);
        return;
      } else {
        alert(response.message);
      }
    } catch (error) {
      setLoading(false);
      alert("Must be in lowercased with no special characters");
    }

    setLoading(false);
  }

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
          Product Type
        </Text>
        <TextInput
          styles={{ label: { fontSize: 13 } }}
          placeholder="Name of product's type"
          mt={16}
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
        <Button
          mt="xl"
          fullWidth
          onClick={createProductTypeInfo}
          loading={loading}
        >
          Create
        </Button>
      </Paper>
    </div>
  );
}
