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
import { getCart, addToCart, updateCart } from "@/redux/cart";
import { getWishlist, addToWishlist } from "@/redux/wishlist";
import { useDispatch, useSelector } from "react-redux";
import ReviewDetail from "./ReviewDetail";
import { useRouter } from "next/router";
function DetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const { cart } = useSelector(getCart);
  const { wishlist } = useSelector(getWishlist);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [productDetail, setDataDetail] = useState({});
  const { id } = router.query;
  console.log("id page", id);
  console.log("wishlist", wishlist);
  console.log("cart", cart);
  console.log("productDetail", productDetail);

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
    const getProduct = async () => {
      const [data, error] = await getProductDetail("/menu/product/" + id);

      if (data) {
        console.log("Product detail", data);
        // console.log(data.info.name);
        setDataDetail(data);
        setLoading(false);
      } else {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  console.log(
    "check",
    wishlist.includes((item) => item.pid === Number(id)),
  );

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
                  <AiOutlineHeart size={24} color="#253d4e" />
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
              color="black"
              size={18}
              mt={20}
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
