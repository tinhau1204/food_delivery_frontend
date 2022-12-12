import React from "react";
import styles from "./styles.module.scss";
import { Tabs, Badge } from "@mantine/core";
import DesDetail from "./DesDetail";
import RevDetail from "./RevDetail";
function ReviewDetail({ description, storeid }) {
  return (
    <Tabs
      defaultValue="description"
      variant="outline"
      style={{ width: "68%", marginBottom: 10 }}
    >
      <Tabs.List>
        <Tabs.Tab value="description">Description</Tabs.Tab>
        <Tabs.Tab
          value="reviews"
          rightSection={
            <Badge
              color="teal"
              sx={{ width: 16, height: 16, pointerEvents: "none" }}
              variant="filled"
              size="xs"
              p={0}
            >
              6
            </Badge>
          }
        >
          Reviews
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="description" pt="xs">
        <DesDetail des={description} />
      </Tabs.Panel>
      <Tabs.Panel value="reviews" pt="xs">
        <RevDetail sid={storeid} />
      </Tabs.Panel>
    </Tabs>
  );
}

export default ReviewDetail;
