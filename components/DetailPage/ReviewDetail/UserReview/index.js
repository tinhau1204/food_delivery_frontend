import { CountingSmallStar } from "@/components/shards/CardItem/components/StarRating";
import {
  Avatar,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  Center,
} from "@mantine/core";
import React from "react";
import WriteReview from "../WriteReview";
import styles from "./styles.module.scss";

function UserReview({ data }) {
  const count = data.length;

  if (count == 0) {
    return (
      // <div style={{ align: "center", justify: "center" }}>
      //   <Center style={{ height: 50 }}>
      //     <Group spacing="sm">
      //       <Title
      //         color="#253d4e"
      //         style={{ alignText: "center", justify: "center" }}
      //       >
      //         No comments
      //       </Title>
      //     </Group>
      //   </Center>
      // </div>
      <Text color="gray" style={{ maxWidth: 550 }}>
        No comments
      </Text>
    );
  } else
    return (
      <>
        {data.map((item, index) => (
          <>
            <Group key={item.product_id}>
              <Stack spacing="none">
                <Avatar radius="xl" size="lg" src="" />
                <Title size="lg" color="#253d4e">
                  {item.name}
                </Title>
              </Stack>
              <Stack spacing="none">
                <Text color="#253d4e" size="sm">
                  {item.timestamp}
                </Text>
                {/* <Text color="##0796fc" size="sm">
                {item.updated}
              </Text> */}
                <Text color="gray" size="sm">
                  {item.comment}
                </Text>
                <Group spacing="none">
                  <CountingSmallStar count={item.star} />
                  <Text size="sm" color="gray">
                    {"(" + item.star + ") " + "Review"}
                  </Text>
                </Group>
              </Stack>
            </Group>
            <Divider my="sm" />
          </>
        ))}
      </>
    );
}

export default UserReview;
