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
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Swal from "sweetalert2";
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

  const [comment, setComment] = useState("");

  const CheckIfExistComment = (value) => {
    const index = orderComment.map((e) => e.store_id).indexOf(value);
    const cmtData = orderComment[index].comment;
    setComment(cmtData);
    console.log(cmtData);
  };

  async function editComment(value) {
    try {
      const [check] = await checkComment("/comment/check", value);
      if (!check) {
        const [insert, error] = await insertComment("comment/create", value);
        if (insert)
          Swal.fire({
            title: "Success",
            text: "Add comment succesfully!",
            icon: "success",
            confirmButtonColor: "#36c6d3",
            confirmButtonText: "Confirm",
          });
        else if (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to add comment!",
            icon: "error",
            confirmButtonColor: "#36c6d3",
            confirmButtonText: "Confirm",
          });
        }
      } else {
        const [update, error] = await updateComment("comment/edit", value);
        if (update)
          Swal.fire({
            title: "Success",
            text: "Update comment succesfully!",
            icon: "success",
            confirmButtonColor: "#36c6d3",
            confirmButtonText: "Confirm",
          });
        else if (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to Update comment!",
            icon: "error",
            confirmButtonColor: "#36c6d3",
            confirmButtonText: "Confirm",
          });
        }
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
    <form onSubmit={handleSubmit} style={{ width: 550, margin: "auto" }}>
      <Stack>
        <Radio.Group
          label="Select a store to comment"
          mb={40}
          orientation="vertical"
          size="md"
          onChange={(value) => {
            setReview((pre) => ({
              ...pre,
              store_id: value.toString(),
            }));
            CheckIfExistComment(value);
          }}
        >
          {orderComment.map((item) => (
            <Group>
              <Radio
                label={item.store_name}
                value={item.store_id}
                defaultValue={orderComment}
              ></Radio>
            </Group>
          ))}
        </Radio.Group>
        <Text color="black">Previous comment</Text>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 5,
            marginBottom: 50,
          }}
        >
          {comment.length > 0 ? (
            <Text p={10} color="teal">
              {comment}
            </Text>
          ) : (
            <Text p={10} fs="italic" color="grey">
              No comment yet!
            </Text>
          )}
        </div>
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
