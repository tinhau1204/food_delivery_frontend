import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  //Checkbox,
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
import { editProduct, getProductById } from "@/lib";
//import Image from "next/image";

const useStyles = createStyles((theme) => ({
  root: {
    marginLeft: 770,
    marginTop: 80,
    height: "100%",
    width: "50vw",
    zIndex: 0,
    position: "absolute",
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

export default function MyStoreAllProductsPage() {
  const [productArray, setProductArray] = useState([]);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
  const store_id = savedCookie.storeId;

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState();
  const [typeChosen, setTypeChosen] = useState("");

  // product info
  const [idProduct, setIdProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [imageProduct, setImageProduct] = useState("");
  const [price, setPrice] = useState(0);
  const test = 50;

  // check if empty
  const [emptyName, setEmptyName] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptyType, setEmptyType] = useState(false);

  // type of product
  const [typeProduct, setTypeProduct] = useState([]);

  // loading
  const [loading, setLoading] = useState(false);

  async function getAllProducts() {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API + "/menu/get-all-products/" + store_id,
      );

      if (response.data.length > 0) {
        const dataArray = [];
        for (let i = 0; i < response.data.length; i++) {
          const { id, name, description, price, type, image } =
            response.data[i];
          const data = {
            product_id: id,
            name: name,
            description: description,
            price: price,
            image: image,
            type: type,
          };

          dataArray.push(data);
        }

        setProductArray(dataArray);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // get all type of product
  async function getAllProductType() {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API + "/menu/get-all-product-type/" + store_id,
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

    setTypeProduct(typeArray);
  }

  // async function getProductInfo(product_id) {
  //   try {
  //     const [response, err] = await getProductById(product_id);

  //     const { name, type_id, description, image, price } = response[0];
  //     setNameProduct(name);
  //     setDescription(description);
  //     setPrice(price);
  //     setTypeChosen(type_id);
  //     setFileUrl(process.env.NEXT_PUBLIC_IPFS_URL + image);
  //     setImageProduct(image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function getProductInfo(index) {
    try {
      const { name, type_id, description, image, price } = productArray[index];
      console.log(productArray[index]);
      console.log(name, type_id, description, image, price);
      // setNameProduct(name);
      // setDescription(description);
      // setPrice(price);
      // setTypeChosen(type_id);
      // setFileUrl(process.env.NEXT_PUBLIC_IPFS_URL + image);
      // setImageProduct(image);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProducts();
    getAllProductType();
  }, []);

  function ClearContent() {
    setDescription("");
    setPrice(0);
    setNameProduct("");
    setImageProduct("");
    setTypeChosen("");
    setTimeout(() => {
      setOpened(false);
    }, 500);
  }

  async function editProductInfo() {
    setLoading(true);
    if (
      nameProduct === "" ||
      description === "" ||
      price === 0 ||
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
    setEmptyType(false);

    if (file !== null) {
      //save image into ipfs
      const fileAdded = await client.add(file);
      setImageProduct(fileAdded.path);
    }

    try {
      const [response, err] = await editProduct(data);
      if (err) {
        alert(err);
        setLoading(false);
        return;
      }
      alert(response);
    } catch (err) {
      alert(err);
    }

    setLoading(false);
  }

  const rows = productArray.map((item, index) => {
    const Icon = IconEdit;
    return (
      <tr key={item.product_id}>
        <td className={classes.tdcontent}> {item.product_id}</td>
        <td className={classes.tdcontent}>{item.name}</td>
        <td className={classes.tdcontent}>$ {item.price}</td>
        <td className={classes.tdcontent}>{item.type}</td>
        <td className={classes.tdcontent}>
          <Button
            variant="default"
            onClick={() => {
              setOpened(true);
              setIdProduct(item.product_id);
              getProductInfo(index);
              //getProductInfo(item.product_id);
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
      <Group position="center">
        <Paper
          p="xl"
          radius="md"
          style={{
            backgroundColor: "#121216",
          }}
        >
          <Text
            className={classes.title}
            component="span"
            align="center"
            size={18}
            weight={650}
            style={{ fontFamily: "Segoe UI" }}
          >
            All products
          </Text>
          <Table sx={{ minWidth: 750 }} verticalSpacing="sm">
            <thead className={classes.thead}>
              <tr>
                <th style={{ width: "10%" }}>ID</th>
                <th style={{ width: "40%" }}>Name</th>
                <th style={{ width: "20%" }}>Price</th>
                <th style={{ width: "20%" }}>Group</th>
                <th style={{ width: "10%" }}>Action</th>
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
            onClose={() => ClearContent()}
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
                EDIT PRODUCT
              </Text>
              <Group position="apart" mb={50}>
                <Paper>
                  <FileInput
                    label="Your product's image"
                    placeholder="Pick an image of your product"
                    required
                    mt="md"
                    value={file}
                    onChange={(value) => {
                      if (value) {
                        setFileUrl(URL.createObjectURL(value));
                        setFile(value);
                      }
                    }}
                  />
                  <Group mt="md">
                    <Image src={fileUrl} height={400} width={400} alt={""} />
                  </Group>
                </Paper>
                <Paper ml={40}>
                  <TextInput
                    placeholder="What is your product's name?"
                    label="Name of the product"
                    radius="md"
                    withAsterisk
                    value={nameProduct}
                    className={classes.textInput}
                    onChange={(value) =>
                      setNameProduct(value.currentTarget.value)
                    }
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
                    mt="md"
                    withAsterisk
                    value={description}
                    onChange={(value) =>
                      setDescription(value.currentTarget.value)
                    }
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
                    mt="md"
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
                    mt="md"
                    withAsterisk
                    defaultValue={price}
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
                </Paper>
              </Group>

              <Button fullWidth onClick={editProductInfo} loading={loading}>
                Edit Product
              </Button>
            </Paper>
          </Modal>
        </Paper>
      </Group>
    </div>
  );
}
