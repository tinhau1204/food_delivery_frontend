import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Menu,
  createStyles,
} from "@mantine/core";
import { IconChevronRight, IconLogout, IconEdit } from "@tabler/icons";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function UserButton({ image, name, email, icon }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  const logOut = () => {
    sessionStorage.removeItem("Store");
    sessionStorage.removeItem("User");
    router.push("/mystore/login", undefined, { shallow: true });
    //window.location.reload();
  };

  return (
    <Menu
      mb={20}
      className={styles.usermenu}
      opened={menuOpen}
      onChange={setMenuOpen}
      position="right-end"
      offset={12}
      withArrow
      arrowPosition="center"
    >
      <Menu.Target>
        <Group>
          <Avatar src={image} size={40} radius="xl" />
          <div style={{ flex: 1 }}>
            <Text size={14} weight={500}>
              {name}
            </Text>
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>
          {icon || <IconChevronRight size={18} stroke={1.5} />}
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <UnstyledButton onClick={() => logOut()}>
          <Menu.Item icon={<IconEdit size="1.2rem" stroke={1.5} />} disabled>
            <Text>Edit account</Text>
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<IconLogout size="1.2rem" stroke={1.5} />}
          >
            <Text>Log out</Text>
          </Menu.Item>
        </UnstyledButton>
      </Menu.Dropdown>
    </Menu>
  );
}
