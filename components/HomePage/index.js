import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, addToCart, updateCart } from "@/redux/cart";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";
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
import { checkLoginCookie } from "@/lib/api/cookie";
import Category from "../shards/Category";
import { getAllProducts } from "@/lib/api/products";
//import CardItem from "../shards/CardItem";
const CardItem = dynamic(() => import("../shards/CardItem"));

function HomePage() {
  let [dataProduct, setDataproduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setPage] = useState(1);
  const limitProduct = 9;
  const totalPage = Math.ceil(
    (filterProduct.length != 0 ? filterProduct.length : dataProduct.length) /
      limitProduct,
  );

  useEffect(() => {
    const getProduct = async () => {
      const [data, error] = await getAllProducts();

      if (data) {
        setDataproduct(data);
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  const [item, setItem] = useState({});
  const [cateName, setCateName] = useState("");
  const dispatch = useDispatch();
  const { cart } = useSelector(getCart);
  const skeletonArray = [
    { pid: 0 },
    { pid: 1 },
    { pid: 2 },
    { pid: 3 },
    { pid: 4 },
    { pid: 5 },
    { pid: 6 },
    { pid: 7 },
    { pid: 8 },
  ];

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
    <>
      <Paper p="lg">
        <Group align="flex-start">
          <Stack align="center" w={300}>
            <Category
              onClickCate={(val) => handleFilter(val)}
              getType={dataProduct}
            />
          </Stack>
          <Grid style={{ flex: 1, marginLeft: "40px" }} columns={12}>
            {!loading ? (
              <>
                {filterProduct?.length === 0
                  ? dataProduct
                      .slice(
                        activePage !== 1 ? limitProduct * (activePage - 1) : 0,
                        activePage * limitProduct,
                      )
                      .map((item, index) => (
                        <Grid.Col key={item.pid} span={4} mb={10}>
                          <CardItem
                            pid={item.pid}
                            ordered={item.ord_amount}
                            store_name={item.store_name}
                            description={item.description}
                            type={item.type}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            stock={item.stock}
                            loading={loading}
                            trending={item.ord_amount > 4 ? "hot" : "new"}
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
                            stock={item.stock}
                            loading={loading}
                            hidden={false}
                            onClick={() => handleAddToCart(item)}
                          />
                        </Grid.Col>
                      ))}
              </>
            ) : (
              <>
                {skeletonArray.map((item, index) => (
                  <Grid.Col key={item.pid} span={4}>
                    <CardItem loading={loading} image={""} />
                  </Grid.Col>
                ))}
              </>
            )}
          </Grid>
        </Group>
        <Pagination
          className={styles.pagination}
          styles={(theme) => ({
            item: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "green",
                  to: "teal",
                }),
              },
            },
          })}
          total={totalPage}
          radius="xl"
          page={activePage}
          onChange={setPage}
        />
      </Paper>
    </>
  );
}

export default HomePage;
