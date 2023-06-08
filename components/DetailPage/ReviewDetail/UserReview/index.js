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
import moment from "moment/moment";

function UserReview({ data }) {
  const count = data.length;

  if (count == 0) {
    return (
      // <div style={{ align: "center", justify: "center" }}>
      //   <Center style={{ height: 50 }}>
      //     <Group spacing="sm">
      //       <Title
      //         color="white"
      //         style={{ alignText: "center", justify: "center" }}
      //       >
      //         No comments
      //       </Title>
      //     </Group>
      //   </Center>
      // </div>
      <Text color="white" style={{ maxWidth: 550 }}>
        No comments
      </Text>
    );
  } else
    return (
      <>
        {data.map((item, index) => (
          <>
            <Group key={item.product_id}>
              <Group spacing={20}>
                <Avatar radius="xl" size="lg" src="/images/defaultuser.png" />
                <Stack spacing={5} mt={10}>
                  <Stack spacing="xs">
                    <Title size="lg" color="white">
                      {item.name}
                    </Title>
                    <Group>
                      <Text color="grey" size={12}>
                        {moment(item.created_date).format("MM/DD/YYYY h:mm a")}
                      </Text>
                      <Text color="grey" size={12}>
                        |
                      </Text>
                      <Text color="grey" size={12}>
                        Product:
                      </Text>
                      <Text color="teal" fw={700} size={12}>
                        {item.products[0].name}
                      </Text>
                    </Group>
                  </Stack>
                  <Group spacing="none">
                    <CountingSmallStar count={item.star} />
                  </Group>
                  <Text color="black" size="sm">
                    {item.comment}
                  </Text>
                </Stack>
              </Group>
            </Group>
            <Divider my="sm" />
          </>
        ))}
      </>
    );
}

export default UserReview;
