import { forwardRef } from "react";
import { LuUser } from "react-icons/lu";
import { Button, Group, Avatar, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/user";
const User = ({ name, ref, ...buttonProps }) => {
  let user = {
    displayName: name,
    // photoURL:
    //   "https://images.glints.com/unsafe/140x140/glints-dashboard.s3.amazonaws.com/profile-picture-default/13.jpg",
  };

  return (
    <Button
      size="sm"
      leftIcon={<LuUser size={20} />}
      variant="subtle"
      color="teal"
      ref={ref}
      {...buttonProps}
      styles={{ backgroundColor: "red" }}
    >
      {/* {!user?.photoURL ? (
          <Avatar
            radius="lg"
            src={user?.photoURL}
            alt={`${user?.displayName} avatar`}
          >
            {user?.displayName[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar
            radius="xl"
            src={user.photoURL}
            alt={`${user.displayName} avatar`}
          />
        )} */}

      <Text transform="capitalize" size={16} fw={400} color="27ca7d">
        {user?.displayName ?? ""}
      </Text>
    </Button>
  );
};

export default User;
