import StarRating from "@/components/shards/CardItem/components/StarRating";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import React, { useState } from "react";
import styles from "./styles.module.scss";
function WriteReview() {
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
    <form onSubmit={handleSubmit} style={{ width: 500 }}>
      <Stack>
        <StarRating name="star" />
        <Textarea
          placeholder="Write Your Comment"
          withAsterisk
          minRows={5}
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
