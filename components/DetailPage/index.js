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
import { getStoreCommments } from "@/lib/api/storecomments";
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

  let [comments, setComments] = useState(null);

  let param = null;

  useEffect(() => {
    const get_param = new URLSearchParams(window.location.search).get("id");
    param = get_param;
    console.log(param);

    const getComment = async (value) => {
      const [data, error] = await getStoreCommments("/store/comments", value);

      if (data) {
        setComments(data);
        console.log(data);
      } else {
        console.log(error);
      }
    };

    const getProduct = async () => {
      const [data, error] = await getProductDetail("/menu/product/" + param);

      if (data) {
        // console.log("Product detail", data);
        // console.log(data.info.name);
        const sid = data.store.sid;
        const json = { store_id: sid };
        getComment(json);
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
              src="/images/pancake.png"
              alt="Detail Food Image"
            />
          </div>
          <Stack spacing="xs">
            <Title color="teal" size={16}>
              {productDetail.info.type}
            </Title>
            <Title color="#253d4e" size={20}>
              {productDetail.info.name}
            </Title>
            {/* <Group>
              <CountingStar count={4} />
              <Text>{"(" + "4.0" + ")"}</Text>
            </Group> */}
            <Title color="#253d4e" size={16}>
              {" "}
            </Title>
            <Title color="dark" size={26}>
              {productDetail.info.price + " $"}
            </Title>
            <Text color="gray" style={{ maxWidth: 550 }}>
              {"[ " + productDetail.info.des + " ]"}
            </Text>
            <List
              type="unordered"
              icon={<BsDot size={20} color="teal" />}
              size="sm"
              style={{ color: "gray" }}
            >
              <List.Item>test 1</List.Item>
              <List.Item>test 1</List.Item>
              <List.Item>test 1</List.Item>
            </List>
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
          </Stack>
        </Group>
        <ReviewDetail />
      </Stack>
    );
}

export default DetailPage;
