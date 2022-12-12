import { React, useState, useEffect } from "react";
import CardStore from "../shards/CardStore";
import { getAllStores } from "@/lib/api/stores";
import styles from "./styles.module.scss";
import { Grid } from "@mantine/core";

function StoreDetailPage() {
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);

  // useEffect(() => {
  //   const getStore = async () => {
  //     const [data, error] = await getAllStores("/store/get-all-stores/");

  //     if (data) {
  //       setStores(data);
  //       setLoading(false);
  //     } else {
  //       console.log(error);
  //     }
  //   };

  //   getStore();
  // }, []);

  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
    ></div>
  );
}

export default StoreDetailPage;
