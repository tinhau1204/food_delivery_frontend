import Image from "next/image";
import React, { useEffect, useState } from "react";
import products, { getAllProducts } from "@/lib/api/products";
import CardItem from "../shards/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart, addToCart, updateCart } from "@/redux/cart";
import styles from "./styles.module.scss";
import Category from "../shards/Category";
import { Container, Grid, Group, Paper, Stack, TextInput } from "@mantine/core";
import { BiArrowFromLeft, BiSearch } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";

import BreadCrumb from "../shards/BreadCrumb";
import useSWR from "swr";

function HomePage() {
  let [dataProduct, setDataproduct] = useState([]);
  // const {data, error, isLoading} = useSWR("/menu/get-all-products", getAllProducts);
  let check = dataProduct.length;

  useEffect(() => {
    const getProduct = async () => {
      const [data, error] = await getAllProducts("/menu/get-all-products");

      if (data) {
        console.log("data product", data);
        setDataproduct(data);
      }
    };

    getProduct();
  }, []);

  const [item, setItem] = useState({});
  const [cateName, setCateName] = useState("");
  const dispatch = useDispatch();
  const { cart } = useSelector(getCart);

  const handleAddToCart = (product) => {
    if (cart.some((item) => item.pid === product.pid)) {
      var oldItem = cart.find((item) => item.pid === product.pid);
      var newItem = { ...oldItem, amount: oldItem.amount + 1 };
      dispatch(updateCart(newItem));
    } else {
      var newItem = { ...product, amount: 1 };
      dispatch(addToCart(newItem));
    }
  };
  // useEffect(() => {
  //   const renderFilter = () => {
  //     const filterProduct = products.filter((item) => item.cate === cateName);
  //     console.log(filterProduct);
  //   };

  //   renderFilter();
  // }, [cateName]);

  return (
    <Paper p="lg" style={{ borderTop: "1px solid #ccc" }}>
      <Group align="flex-start">
        <Stack align="center">
          <TextInput
            placeholder="Search"
            icon={<BiSearch />}
            rightSection={<AiOutlineArrowRight color="teal" />}
            size="sm"
            style={{ width: 280 }}
          />
          <Category onClickCate={(val) => setCateName(val.toLowerCase())} />
        </Stack>
        <Grid style={{ flex: 1 }} columns={12}>
          {check > 0 &&
            dataProduct.map((item, index) => (
              <Grid.Col key={item.pid} span={4}>
                <CardItem
                  pid={item.pid}
                  ordered={item.ord_amount}
                  store_name={item.store_name}
                  description={item.description}
                  type={item.type}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  onClick={() => handleAddToCart(item)}
                />
              </Grid.Col>
            ))}
        </Grid>
      </Group>
    </Paper>
  );
}

export default HomePage;
