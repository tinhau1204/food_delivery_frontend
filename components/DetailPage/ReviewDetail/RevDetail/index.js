import { Container, Group, Stack, Title } from "@mantine/core";
import React from "react";
import useSWR from "swr";
import UserReview from "../UserReview";
import WriteReview from "../WriteReview";

function RevDetail() {
  return (
    <Container
      p={0}
      style={{ marginLeft: 0, marginRight: 0, maxWidth: "100%" }}
    >
      <Group align="flex-start">
        <Stack justify="flex-start" align="flex-start" style={{ flex: 1 }}>
          <Title size={20} color="#253d4e">
            Customer questions & answer
          </Title>
          <UserReview
            data={[
              {
                product_id: 1,
                timestamp: "December 4, 2022 at 3:12 pm",
                comment: "That is a good thing",
                star: 3.9,
              },
              {
                product_id: 1,
                timestamp: "December 4, 2022 at 3:12 pm",
                comment: "That is a good thing",
                star: 3.9,
              },
            ]}
          />
        </Stack>
        <Stack>
          <Title size={20} color="#253d4e">
            Add a review
          </Title>
          <WriteReview />
        </Stack>
      </Group>
    </Container>
  );
}

export default RevDetail;
