import { React, useState, useEffect } from "react";
import CardStore from "../shards/CardStore";
import { getAllStores } from "@/lib/api/stores";
import styles from "./styles.module.scss";
import { Grid } from "@mantine/core";

function StorePage() {
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStore = async () => {
      const [data, error] = await getAllStores("/store/get-all-stores/");

      if (data) {
        setStores(data);
        setLoading(false);
      } else {
        console.log(error);
      }
    };

    getStore();
  }, []);

  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Grid style={{ flex: 1 }} columns={14} align="center" justify="center">
        {stores ? (
          stores.map((item, index) => (
            <Grid.Col key={item.id} span={3}>
              <CardStore
                id={item.id}
                name={item.name}
                address={item.address}
                description={item.description}
                type_name={item.type_name}
                image={item.image}
                active_date={item.active_date}
              />
            </Grid.Col>
          ))
        ) : (
          <div>Loading</div>
        )}
      </Grid>
    </div>
  );
}

export default StorePage;
