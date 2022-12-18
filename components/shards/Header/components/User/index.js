import { forwardRef } from "react";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/user";
const User = ({ name, ref, ...buttonProps }) => {
  let user = {
    displayName: name,
    photoURL:
      "https://images.glints.com/unsafe/140x140/glints-dashboard.s3.amazonaws.com/profile-picture-default/13.jpg",
  };

  return (
    <UnstyledButton ref={ref} {...buttonProps}>
      <Group spacing="xs" style={{ width: "max-content" }}>
        {!user?.photoURL ? (
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
        )}
        <div>
          <Text color="teal">{user?.displayName ?? ""}</Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};

export default forwardRef(User);
