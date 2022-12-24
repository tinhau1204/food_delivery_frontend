import StarRating from "@/components/shards/CardItem/components/StarRating";
import { Button, Stack, Textarea, TextInput, Text, Group } from "@mantine/core";
import React, { useState } from "react";
import styles from "./styles.module.scss";
function WriteReview({ orderid }) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState({
    star: "",
    comment: "",
    name: "",
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // transfer this to history
  return (
    <form onSubmit={handleSubmit} style={{ width: 350, margin: "auto" }}>
      <Stack>
        <Group mb={20}>
          <Text mr={5}>ID:</Text>
          <Text color="teal">{orderid}</Text>
        </Group>
        <StarRating name="star" size={20} />
        <Textarea
          placeholder="Write Your Comment"
          withAsterisk
          minRows={4}
          autosize
          name="comment"
          onChange={(e) => setComment(e.currentTarget.value)}
        />
        <Button color="teal" type="submit">
          Submit Review
        </Button>
      </Stack>
    </form>
  );
}

export default WriteReview;
