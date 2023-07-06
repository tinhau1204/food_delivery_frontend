import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  //Checkbox,
  useMantineTheme,
  Group,
  Modal,
  Text,
  Stack,
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
import { IpfsClient } from "@/lib/api/ipfsClient";
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
  var savedCookie;
  var store_id;

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState();
  const [typeChosen, setTypeChosen] = useState("");

  // product info
  const [idProduct, setIdProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [imageProduct, setImageProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  // check if empty
  const [emptyName, setEmptyName] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptyStock, setEmptyStock] = useState(false);
  const [emptyType, setEmptyType] = useState(false);

  // type of product
  const [typeProduct, setTypeProduct] = useState([]);

  // loading
  const [loading, setLoading] = useState(false);

  async function getAllProducts() {
    try {
      savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
      store_id = savedCookie.storeId;

      const response = await axios.get(
        process.env.NEXT_PUBLIC_API + "/menu/get-all-products/" + store_id,
      );

      if (response.data.length > 0) {
        const dataArray = [];
        for (let i = 0; i < response.data.length; i++) {
          const {
            id,
            name,
            description,
            price,
            stock,
            type,
            image,
            created_date,
            updated_date,
          } = response.data[i];
          const data = {
            product_id: id,
            name: name,
            description: description,
            price: price,
            stock: stock,
            image: image,
            type: type,
            created_date: created_date,
            updated_date: updated_date,
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
      data.value = types[i].name;
      data.label = types[i].name;

      typeArray.push(data);
    }

    setTypeProduct(typeArray);
  }

  async function getProductInfo(index) {
    try {
      const { name, type, description, image, price, stock } =
        productArray[index];
      setNameProduct(name);
      setDescription(description);
      setPrice(price);
      setStock(stock);
      setTypeChosen(type);
      setFileUrl(process.env.NEXT_PUBLIC_IPFS_URL + image);
      setImageProduct(image);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProducts();
    getAllProductType();
  }, []);

  function ClearContent() {
    setOpened(false);
    setTimeout(() => {
      setDescription("");
      setPrice(0);
      setStock(0);
      setNameProduct("");
      setImageProduct("");
      setTypeChosen("");
    }, 200);
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
      const fileAdded = await IpfsClient.add(file);
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
        <td className={classes.tdcontent}>{item.stock}</td>
        <td className={classes.tdcontent}>{item.type}</td>
        <td className={classes.tdcontent}>
          <Button
            variant="default"
            onClick={() => {
              setOpened(true);
              setIdProduct(item.product_id);
              getProductInfo(index);
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
            backgroundColor: "#25262b",
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
                <th style={{ width: "20%" }}>Stock</th>
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
            <Paper ml={10}>
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
                    value={file}
                    onChange={(value) => {
                      if (value) {
                        setFileUrl(URL.createObjectURL(value));
                        setFile(value);
                      }
                    }}
                  />
                  <Image
                    priority
                    loader={({ src }) => src}
                    mt="md"
                    src={fileUrl}
                    height={320}
                    width={320}
                    alt={""}
                  />
                </Paper>
                <Paper ml={10} mr={10}>
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
                    defaultValue={typeChosen}
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
                    defaultValue={Number(price)}
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
                  <NumberInput
                    label="Stock"
                    radius="md"
                    mt="md"
                    withAsterisk
                    defaultValue={Number(stock)}
                    precision={0}
                    min={0}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={(value) => setStock(value)}
                    formatter={(value) =>
                      !Number.isNaN(parseInt(value))
                        ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "$ "
                    }
                    error={emptyStock}
                  ></NumberInput>
                  {emptyStock ? (
                    <Text fz="xs" c="red">
                      Stock must higher than 0
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
