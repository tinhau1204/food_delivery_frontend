import {
  ActionIcon,
  Button,
  Center,
  Container,
  Group,
  Image,
  List,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getProductDetail } from "@/lib/api/productdetail";
import styles from "./styles.module.scss";
import { CountingStar } from "../shards/CardItem/components/StarRating";
import { BsDot } from "react-icons/bs";
import SelectDetail from "./SelectDetail";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ReviewDetail from "./ReviewDetail";
function DetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const [loading, setLoading] = useState(true);
  const [productDetail, setDataDetail] = useState({});

  let param = null;
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;

  useEffect(() => {
    const get_param = new URLSearchParams(window.location.search).get("id");
    param = get_param;

    const getProduct = async () => {
      const [data, error] = await getProductDetail("/menu/product/" + param);

      if (data) {
        // console.log("Product detail", data);
        // console.log(data.info.name);
        setDataDetail(data);
        setLoading(false);
      } else {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  if (loading)
    return (
      <div
        style={{
          width: 400,
          height: 400,
        }}
      ></div>
    );
  else
    return (
      <Stack
        align="center"
        style={{ maxWidth: 1539, marginTop: 20, marginBottom: 20 }}
      >
        <Group
          position="center"
          spacing="xl"
          align="flex-start"
          style={{ justifyContent: "space-around" }}
        >
          <div
            style={{
              width: 400,
              height: 400,
              border: "1px solid #ccc",
              borderRadius: 5,
              marginRight: 20,
            }}
          >
            <Image
              radius="md"
              src={img_load + productDetail.info.image}
              alt="Detail Food Image"
              width="100%"
              height="100%"
              styles={{
                figure: { width: "100%", height: "100%" },
                imageWrapper: { width: "100%", height: "100%" },
                objectFit: "cover",
              }}
            />
          </div>
          <Stack spacing="xs">
            <Title color="#253d4e" size={26}>
              {productDetail.info.name}
            </Title>
            <Group>
              <Text color="gray">Type:</Text>
              <Title color="teal" size={14}>
                {productDetail.info.type}
              </Title>
            </Group>
            <Group mt={10} mb={15}>
              <Text color="gray">Price:</Text>
              <Title color="#253d4e" size={26}>
                {productDetail.info.price + " $"}
              </Title>
            </Group>
            {/* <List
              type="unordered"
              icon={<BsDot size={20} color="teal" />}
              size="sm"
              style={{ color: "gray" }}
            >
              <List.Item>test 1</List.Item>
              <List.Item>test 1</List.Item>
              <List.Item>test 1</List.Item>
            </List> */}
            <SelectDetail
              onclickquantity={(item) => setQuantity(item)}
              // onclickweight={(item) => setWeight(item)}
            />
            <Group>
              <ActionIcon
                size="xl"
                variant="outline"
                color="teal"
                onClick={() => setWishlist(!wishlist)}
              >
                {wishlist ? (
                  <AiFillHeart size={24} color="#f74b81" />
                ) : (
                  <AiOutlineHeart size={24} color="#253d4e" />
                )}
              </ActionIcon>
              <Button color="teal" size="md">
                Buy Now
              </Button>
              <Button
                color="teal"
                variant="light"
                size="md"
                leftIcon={<AiOutlineShoppingCart />}
              >
                Add to Cart
              </Button>
            </Group>
            <Text
              color="black"
              size={18}
              mt={10}
              style={{ fontWeight: "bold" }}
            >
              Description
            </Text>
            <Text
              color="gray"
              size={14}
              style={{ maxWidth: 340, overflowWrap: "break-word" }}
            >
              {productDetail.info.des}{" "}
            </Text>
          </Stack>
        </Group>
        <ReviewDetail
          store={productDetail.store}
          storeid={productDetail.store.sid}
        />
      </Stack>
    );
}

export default DetailPage;
