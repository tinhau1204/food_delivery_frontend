import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export function UserButton({ image, email, icon, ...others }) {
  const { classes } = useStyles();

  const router = useRouter();

  const logOut = () => {
    sessionStorage.removeItem("Store");
    sessionStorage.removeItem("User");
    router.push("/mystore/login");
    window.location.reload();
  };

  return (
    <UnstyledButton
      className={classes.user}
      {...others}
      onClick={() => logOut()}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {email}
          </Text>

          <Text color="dimmed" size="xs">
            Seller
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
}
