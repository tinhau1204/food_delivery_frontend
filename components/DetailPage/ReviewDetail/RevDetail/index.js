import { Container, Group, Stack, Title } from "@mantine/core";
import { React, useState, useEffect } from "react";
//import useSWR from "swr";
import UserReview from "../UserReview";
//import WriteReview from "../WriteReview";
import { getStoreCommments } from "@/lib/api/storecomments";

function RevDetail({ sid }) {
  let [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComment = async (value) => {
      const [data, error] = await getStoreCommments("/store/comments", value);

      if (data) {
        setComments(data);
        setLoading(false);
        //console.log(data);
      } else {
        console.log(error);
      }
    };

    const json = { store_id: sid };
    getComment(json);
  }, []);

  return (
    <Container
      p={0}
      style={{ marginLeft: 0, marginRight: 0, maxWidth: "100%" }}
    >
      {!loading ? (
        <Group align="flex-start">
          <Stack justify="flex-start" align="flex-start" style={{ flex: 1 }}>
            <UserReview data={comments} />
          </Stack>
          {/* <Stack>
            <Title size={20} color="#253d4e">
              Add a review
            </Title>
            <WriteReview />
          </Stack> */}
        </Group>
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
}

export default RevDetail;
