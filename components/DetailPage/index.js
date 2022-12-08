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
  const [weight, setWeight] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    console.log("quantity", quantity);
    console.log("weight", weight);
  }, [quantity, weight]);
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
          <Image radius="md" src="" alt="Detail Food Image" />
        </div>
        <Stack spacing="xs">
          <Title color="teal" size={16}>
            Fruit
          </Title>
          <Title color="#253d4e" size={20}>
            Fresh figs
          </Title>
          <Group>
            <CountingStar count={4} />
            <Text>{"(" + "4.0" + ")"}</Text>
          </Group>
          <Title color="#253d4e" size={16}>
            Price for 1 package
          </Title>
          <Title color="dark" size={26}>
            {"$ " + "24" + ".00"}
          </Title>
          <Text color="gray" style={{ maxWidth: 550 }}>
            Fresh figs are an amazing exotic fruit that people began to eat many
            years ago. Many people, for the first time faced with these unusual
            fruits.
          </Text>
          <List
            type="unordered"
            icon={<BsDot size={20} color="teal" />}
            size="sm"
            style={{ color: "gray" }}
          >
            <List.Item>
              This is a great remedy for those who suffer from constipation
            </List.Item>
            <List.Item>
              This is a great remedy for those who suffer from constipation
            </List.Item>
            <List.Item>
              This is a great remedy for those who suffer from constipation
            </List.Item>
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
