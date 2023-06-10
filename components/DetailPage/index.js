import {
  ActionIcon,
  Button,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getProductDetailById } from "@/lib/api/products";
// import styles from "./styles.module.scss";
// import { CountingStar } from "../shards/CardItem/components/StarRating";
import { BsDot } from "react-icons/bs";
import SelectDetail from "./SelectDetail";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { getCart, addToCart, updateCart } from "@/redux/cart";
import { getWishlist, addToWishlist } from "@/redux/wishlist";
import { useDispatch, useSelector } from "react-redux";
import ReviewDetail from "./ReviewDetail";
import { useRouter } from "next/router";

function DetailPage({ product_id }) {
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const { cart } = useSelector(getCart);
  const { wishlist } = useSelector(getWishlist);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [productDetail, setDataDetail] = useState({});
  const router = useRouter();
  const [productId, setProductId] = useState("");
  var { id } = router.query;

  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.pid === product.pid)) {
      var oldItem = cart.find((item) => item.pid === product.pid);
      var newItem = { ...oldItem, amount: oldItem.amount + quantity };
      dispatch(updateCart(newItem));
    } else {
      var newItem = { ...product, amount: quantity };
      dispatch(addToCart(newItem));
    }
  };

  useEffect(() => {
    if (id == null || id == undefined) {
      id = product_id;
    }
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      setProductId(id);
      const [data, error] = await getProductDetailById(id);

      if (data) {
        setDataDetail(data);
        setLoading(false);
      } else {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  // console.log(
  //   "check",
  //   wishlist.includes((item) => item.pid === Number(id)),
  // );

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
                root: { height: "100%" },
                figure: { width: "100%", height: "100%" },
                imageWrapper: { width: "100%", height: "100%" },
                objectFit: "cover",
              }}
            />
          </div>
          <Stack spacing="xs">
            <Title color="white" size={26}>
              {productDetail.info.name}
            </Title>
            <Group>
              <Text color="white">Type:</Text>
              <Title color="teal" size={14}>
                {productDetail.info.type}
              </Title>
            </Group>
            <Group mt={10} mb={15}>
              <Text color="white">Price:</Text>
              <Title color="white" size={26}>
                {productDetail.info.price + " $"}
              </Title>
            </Group>
            <SelectDetail
              onclickquantity={(item) => setQuantity(item)}
              // onclickweight={(item) => setWeight(item)}
            />
            <Group>
              <ActionIcon
                size="xl"
                variant="outline"
                color="teal"
                onClick={() => {
                  dispatch(
                    addToWishlist({
                      ...productDetail.info,
                      pid: productDetail.id,
                    }),
                  );
                }}
              >
                {wishlist.some((item) => item.pid == Number(id)) ? (
                  <AiFillHeart size={24} color="#f74b81" />
                ) : (
                  <AiOutlineHeart size={24} color="white" />
                )}
              </ActionIcon>
              {/* <Button color="teal" size="md">
                Buy Now
              </Button> */}
              <Button
                color="teal"
                variant="light"
                size="md"
                leftIcon={<AiOutlineShoppingCart />}
                onClick={() =>
                  handleAddToCart({
                    ...productDetail.info,
                    pid: productDetail.id,
                    amount: quantity,
                  })
                }
              >
                Add to Cart
              </Button>
            </Group>
            <Text
              color="white"
              size={18}
              mt={20}
              style={{ fontWeight: "bold" }}
            >
              Description
            </Text>
            <Text
              color="white"
              size={14}
              style={{ maxWidth: 340, overflowWrap: "break-word" }}
            >
              {productDetail.info.des}{" "}
            </Text>
          </Stack>
        </Group>
        <ReviewDetail
          store={productDetail.store}
          store_id={productDetail.store.sid}
          product_id={productId}
        />
      </Stack>
    );
}

export default DetailPage;
