import {
  Button,
  createStyles,
  FileInput,
  Group,
  NumberInput,
  Paper,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import image from "/public/images/default-thumbnail.jpg";
import { getAllProductsType, createProduct } from "@/lib";
import axios from "axios";
import { client } from "../common";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    position: "absolute",
    zIndex: 1,
    marginLeft: 635,
    height: "80%",
  },
  title: {
    color: theme.colors.gray[4],
    display: "flex",
    justifyContent: "center",
  },
  contentPaper: {
    backgroundColor: "#121216",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
  textInput: {
    width: 400,
  },
}));

//eslint prettier

export default function MyStoreNewProductPage() {
  const { classes } = useStyles();
  const [emptyImage, setEmptyImage] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(image);
  const [typeChosen, setTypeChosen] = useState("");

  // product info
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  // check if empty
  const [emptyName, setEmptyName] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptyType, setEmptyType] = useState(false);

  // type of product
  const [typeProduct, setTypeProduct] = useState([]);

  // loading
  const [loading, setLoading] = useState(false);

  const savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
  const store_id = savedCookie.storeId;

  // get all type of product
  async function getAllProductsTypeFromStore() {
    const [response, error] = await getAllProductsType(store_id);
    if (response != null || response != undefined) {
      const types = response;
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

      setTypeProduct(typeArray);
    }
  }

  useEffect(() => {
    if (document.cookie.indexOf("Sel") > -1) {
      getAllProductsTypeFromStore();
    }
  }, []);

  async function newProduct() {
    setLoading(true);
    if (
      nameProduct === "" ||
      description === "" ||
      price === 0 ||
      file === null ||
      typeChosen === ""
    ) {
      // check if name is empty
      if (nameProduct === "") {
        setEmptyName(true);
      } else {
        setEmptyName(false);
      }

      // check if description is empty
      if (description === "") {
        setEmptyDescription(true);
      } else {
        setEmptyDescription(false);
      }

      // check if price = 0
      if (price === 0) {
        setEmptyPrice(true);
      } else {
        setEmptyPrice(false);
      }

      // check if file is empty
      if (file === null) {
        setEmptyImage(true);
      } else {
        setEmptyImage(false);
      }

      // check if type is empty
      if (typeChosen === "") {
        setEmptyType(true);
      } else {
        setEmptyType(false);
      }
      setLoading(false);
      return;
    }

    setEmptyName(false);
    setEmptyDescription(false);
    setEmptyPrice(false);
    setEmptyImage(false);
    setEmptyType(false);

    //save image into ipfs
    const fileAdded = await client.add(file);
    const data = {
      store_id: store_id,
      name: nameProduct,
      description: description,
      type_id: typeChosen,
      image: fileAdded.path,
      price: price.toString(),
    };

    try {
      const [response, error] = await createProduct(data);
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
          Product Information
        </Text>
        <Group position="apart">
          <Paper style={{ backgroundColor: "#121216" }}>
            <FileInput
              label="Your product's image"
              placeholder="Pick an image of your product"
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
              <Image src={fileUrl} height={400} width={400} alt={""} />
            </Group>
          </Paper>
          <Paper ml={30} mt={85} mr={10} style={{ backgroundColor: "#121216" }}>
            <TextInput
              placeholder="What is your product's name?"
              label="Name of the product"
              radius="md"
              withAsterisk
              className={classes.textInput}
              onChange={(value) => setNameProduct(value.currentTarget.value)}
              error={emptyName}
            ></TextInput>
            {emptyName ? (
              <Text fz="xs" c="red">
                Name is required
              </Text>
            ) : (
              <></>
            )}
            <Textarea
              placeholder="Description of your product"
              label="Description"
              radius="md"
              mt="lg"
              withAsterisk
              onChange={(value) => setDescription(value.currentTarget.value)}
              error={emptyDescription}
            ></Textarea>
            {emptyDescription ? (
              <Text fz="xs" c="red">
                Description is required
              </Text>
            ) : (
              <></>
            )}
            <Select
              label="Your product type"
              placeholder="Pick one"
              required
              searchable
              nothingFound="No options"
              mt="lg"
              error={emptyType}
              data={typeProduct}
              value={typeChosen}
              onChange={(value) => setTypeChosen(value)}
            />
            {emptyType ? (
              <Text fz="xs" c="red">
                Product Type is required
              </Text>
            ) : (
              <></>
            )}
            <NumberInput
              label="Price"
              radius="md"
              mt="lg"
              withAsterisk
              defaultValue={0}
              precision={2}
              min={0}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => setPrice(value)}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              error={emptyPrice}
            ></NumberInput>
            {emptyPrice ? (
              <Text fz="xs" c="red">
                Price must higher than 0
              </Text>
            ) : (
              <></>
            )}
            <Button mt={40} fullWidth onClick={newProduct} loading={loading}>
              Create
            </Button>
          </Paper>
        </Group>
      </Paper>
    </div>
  );
}
