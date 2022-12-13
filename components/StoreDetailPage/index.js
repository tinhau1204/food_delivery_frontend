import { React, useState, useEffect } from "react";
import CardItem from "../shards/CardItem";
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
  Badge,
  Title,
  FileInput,
} from "@mantine/core";
import CardStore from "../shards/CardStore";

import styles from "./styles.module.scss";
import { Grid } from "@mantine/core";
import { getStoreAndProduct } from "@/lib/api/storedetail";

function StoreDetailPage() {
  const [loading, setLoading] = useState(true);
  const [storedetail, setStoreDetail] = useState("");

  let param = null;
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;

  function removeElememnts(selector) {
    let list = document.querySelectorAll(`${selector}`);
    list.forEach((e) => {
      e.remove();
    });
  }

  useEffect(() => {
    const get_param = new URLSearchParams(window.location.search).get("id");
    param = get_param;

    const getStoreWithProduct = async () => {
      const [data, error] = await getStoreAndProduct("/store/id=" + param);

      if (data) {
        console.log("Store detail", data);
        setStoreDetail(data);
        //console.log(storedetail.products.length);
        setLoading(false);
      } else {
        console.log(error);
      }
    };

    getStoreWithProduct();
  }, []);

  if (!loading)
    return (
      <>
        <div className="store_detail"></div>
        <div className="product_list"></div>
        <Group
          mb={30}
          style={{
            border: "1px solid #ccc",
            margin: "auto",
            marginBlock: 30,
            borderRadius: 5,
            paddingRight: 20,
            paddingBottom: 10,
            width: "fit-content",
          }}
        >
          <Stack
            style={{
              maxWidth: 400,
              marginTop: 10,
              marginLeft: 20,
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: 10,
                marginRight: 20,
                overflowWrap: "break-word",
              }}
            >
              <Image
                radius="md"
                src={img_load + storedetail.store[0].image}
                alt="Store Image"
              />
            </div>
          </Stack>
          <Group position="apart" style={{ position: "relative" }}>
            <Stack
              spacing={4}
              align="flex-start"
              justify="flex-start"
              mt={10}
              mr={20}
            >
              <Title color="#253d4e" size={18}>
                {storedetail.store[0].name}
              </Title>
              <Badge
                color="pink"
                mt={20}
                variant="light"
                style={{
                  fontSize: 10,
                }}
              >
                {storedetail.store[0].type_name}
              </Badge>
              <Group mt={20}>
                <Text color="black" size={16}>
                  Address:
                </Text>
                <Text
                  color="gray"
                  size={16}
                  style={{
                    maxWidth: 240,
                    overflowWrap: "break-word",
                  }}
                >
                  {storedetail.store[0].address}
                </Text>
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
                {/* {storedetail.store[0].des} */}
                82/b khu pho 6 phuong hiep thanh
              </Text>
            </Stack>
            <Stack
              align="flex-end"
              justify="flex-start"
              style={{ position: "absolute", top: "0.5rem", right: "0" }}
            >
              <Text color="green" size={14}>
                {/* {storedetail.store[0].active_date} */}
                Active: Date
              </Text>
            </Stack>
          </Group>
        </Group>
        <Group
          style={{
            border: "0.5px solid #ccc",
            backgroundColor: "#ccc",
            margin: "auto",
            marginBlock: 30,
            borderRadius: 5,
            height: "0.6rem",
            width: "90%",
          }}
        ></Group>
        <Grid
          style={{ flex: 1, margin: "auto", marginBottom: 50 }}
          columns={16}
        >
          {storedetail.products.map((item, index) => (
            <Grid.Col key={item.pid} span={3}>
              <CardItem
                pid={item.id}
                description={item.description}
                type={item.type_name}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </Grid.Col>
          ))}
          {removeElememnts(".mantine-UnstyledButton-root.mantine-Button-root")}
          {removeElememnts(
            ".mantine-UnstyledButton-root.mantine-ActionIcon-root.styles_rightSection__jzjqv",
          )}
        </Grid>
      </>
    );
}

export default StoreDetailPage;
