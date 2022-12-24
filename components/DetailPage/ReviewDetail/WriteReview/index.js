import StarRating from "@/components/shards/CardItem/components/StarRating";
import {
  Button,
  Stack,
  Textarea,
  TextInput,
  Text,
  Group,
  Radio,
} from "@mantine/core";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  insertComment,
  checkComment,
  updateComment,
} from "@/lib/api/order/comment";

function WriteReview({ orderId, orderComment }) {
  let cookieInfo = "";
  if (document.cookie) {
    cookieInfo = JSON.parse(document.cookie.split("=")[1]);
  }

  const [commentStoreId, setCommentStoreId] = useState("");

  async function editComment(value) {
    try {
      const [check] = await checkComment("/comment/check", value);
      if (!check) {
        const [insert, error] = await insertComment("comment/create", value);
        if (insert) alert("insert duoc rui ze");
      } else {
        const [update, error] = await updateComment("comment/edit", value);
        if (update) alert("update done!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  let [review, setReview] = useState({
    account_id: cookieInfo.userId,
    star: "",
    comment: "",
    //image: "",
    order_id: orderId,
    store_id: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // transfer this to history
  return (
    <form onSubmit={handleSubmit} style={{ width: 350, margin: "auto" }}>
      <Stack>
        <Radio.Group
          label="Select a store to comment"
          ml={25}
          mb={40}
          orientation="vertical"
          size="md"
          onChange={(value) => {
            setReview((pre) => ({
              ...pre,
              store_id: value.toString(),
            }));
          }}
        >
          {orderComment.map((item) => (
            <Radio
              label={item.store_name}
              value={item.store_id}
              defaultValue={orderComment}
            ></Radio>
          ))}
        </Radio.Group>
        <StarRating
          name="star"
          size={20}
          onchange={(value) => {
            setReview((pre) => ({
              ...pre,
              star: parseInt(value),
            }));
          }}
        />
        <Textarea
          placeholder="Write Your Comment"
          withAsterisk
          minRows={4}
          autosize
          name="comment"
          onChange={(e) =>
            setReview((pre) => ({
              ...pre,
              comment: e.target.value.toString(),
            }))
          }
        />
        <Button
          color="teal"
          type="submit"
          onClick={() => {
            editComment(review);
          }}
        >
          Edit
        </Button>
      </Stack>
    </form>
  );
}

export default WriteReview;
