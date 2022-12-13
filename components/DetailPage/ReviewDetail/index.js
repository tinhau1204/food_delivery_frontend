import React from "react";
import styles from "./styles.module.scss";
import { Tabs, Badge } from "@mantine/core";
import DesDetail from "./DesDetail";
import RevDetail from "./RevDetail";
function ReviewDetail({ store, storeid }) {
  return (
    <Tabs
      defaultValue="description"
      variant="outline"
      style={{ width: "68%", marginBottom: 10 }}
    >
      <Tabs.List>
        <Tabs.Tab value="description">Store</Tabs.Tab>
        <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="description" pt="xs">
        <DesDetail storeinfo={store} />
      </Tabs.Panel>
      <Tabs.Panel value="reviews" pt="xs">
        <RevDetail sid={storeid} />
      </Tabs.Panel>
    </Tabs>
  );
}

export default ReviewDetail;
