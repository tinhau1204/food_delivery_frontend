import {
  Button,
  createStyles,
  Group,
  Paper,
  Text,
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
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 40,
  },
  textInput: {
    width: 400,
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
        process.env.API + "menu/new-product-type",
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
      <Group position="center">
        <Paper
          w={350}
          withBorder
          p="xl"
          radius="md"
          shadow="0 0 35px rgb(127 150 174 / 15%);"
        >
          <Text
            className={classes.title}
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            NEW PRODUCT TYPE
          </Text>
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
          <Button
            mt="xl"
            fullWidth
            onClick={createProductType}
            loading={loading}
          >
            Create
          </Button>
        </Paper>
      </Group>
    </div>
  );
}
