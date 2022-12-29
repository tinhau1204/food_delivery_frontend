import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api/products";
import CardItem from "../shards/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart, addToCart, updateCart } from "@/redux/cart";
import styles from "./styles.module.scss";
import Category from "../shards/Category";
import {
  Grid,
  Group,
  Menu,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  TextInput,
} from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { checkLoginCookie } from "@/lib/api/cookie";
//import BreadCrumb from "../shards/BreadCrumb";
//import useSWR from "swr";

function HomePage() {
  let [dataProduct, setDataproduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const limitProduct = 9;
  const totalPage = Math.ceil(
    (filterProduct.length != 0 ? filterProduct.length : dataProduct.length) /
      limitProduct,
  );
  // const {data, error, isLoading} = useSWR("/menu/get-all-products", getAllProducts);
  let check = dataProduct.length;
  useEffect(() => {
    setLoading(false);
    const getProduct = async () => {
      const [data, error] = await getAllProducts("/menu/get-all-products");

      if (data) {
        setDataproduct(data);
        setLoading(true);
      }
    };

    getProduct();
  }, []);

  const [item, setItem] = useState({});
  const [cateName, setCateName] = useState("");
  const dispatch = useDispatch();
  const { cart } = useSelector(getCart);

  const handleAddToCart = (product) => {
    if (checkLoginCookie()) {
      if (cart.some((item) => item.pid === product.pid)) {
        var oldItem = cart.find((item) => item.pid === product.pid);
        var newItem = { ...oldItem, amount: oldItem.amount + 1 };
        dispatch(updateCart(newItem));
      } else {
        var newItem = { ...product, amount: 1 };
        dispatch(addToCart(newItem));
      }
    }
  };

  const handleFilter = (value) => {
    const filter = dataProduct.filter((item) =>
      value.toLowerCase() == "food"
        ? item.type != "drink"
        : item.type == value.toLowerCase(),
    );
    setFilterProduct(filter);
  };
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
          <Category
            onClickCate={(val) => handleFilter(val)}
            getType={dataProduct}
          />
        </Stack>
        <Grid style={{ flex: 1 }} columns={12}>
          {filterProduct?.length === 0
            ? dataProduct
                .slice(
                  activePage !== 1 ? limitProduct * (activePage - 1) : 0,
                  activePage * limitProduct,
                )
                .map((item, index) => (
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
                      hidden={false}
                      onClick={() => handleAddToCart(item)}
                    />
                  </Grid.Col>
                ))
            : filterProduct
                .slice(
                  activePage !== 1 ? limitProduct * (activePage - 1) : 0,
                  activePage * limitProduct,
                )
                .map((item, index) => (
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
                      hidden={false}
                      onClick={() => handleAddToCart(item)}
                    />
                  </Grid.Col>
                ))}
        </Grid>
      </Group>
      <Pagination
        className={styles.pagination}
        styles={(theme) => ({
          item: {
            "&[data-active]": {
              backgroundImage: theme.fn.gradient({ from: "green", to: "teal" }),
            },
          },
        })}
        total={totalPage}
        radius="xl"
        page={activePage}
        onChange={setPage}
      />
    </Paper>
  );
}

export default HomePage;
