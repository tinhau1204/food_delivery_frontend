import React from "react";
import styles from "./styles.module.scss";
import { Tabs, Badge } from "@mantine/core";
import DesDetail from "./DesDetail";
import RevDetail from "./RevDetail";
function ReviewDetail({ store, store_id }) {
  return (
    <Tabs
      defaultValue="storeinfo"
      variant="outline"
      style={{ width: "68%", marginBottom: 10 }}
    >
      <Tabs.List>
        <Tabs.Tab value="storeinfo">Store Info</Tabs.Tab>
        <Tabs.Tab value="reviews">Store Reviews</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="storeinfo" pt="xs">
        <DesDetail storeinfo={store} />
      </Tabs.Panel>
      <Tabs.Panel value="reviews" pt="xs">
        <RevDetail sid={store_id} />
      </Tabs.Panel>
    </Tabs>
  );
}

export default ReviewDetail;
