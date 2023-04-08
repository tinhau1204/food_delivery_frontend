import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Menu,
  createStyles,
} from "@mantine/core";
import {
  IconChevronRight,
  IconLogout,
  IconEdit,
  Icon3dRotate,
} from "@tabler/icons";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function UserButton({ image, name, email, icon }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const logOut = () => {
    // sessionStorage.removeItem("Store");
    // sessionStorage.removeItem("User");
    document.cookie = `User=;Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;`;
    router.push("/seller/login");
  };

  return (
    <Menu
      mb={20}
      className={styles.usermenu}
      opened={menuOpen}
      onChange={setMenuOpen}
      position="right-end"
      offset={12}
      arrowPosition="center"
    >
      <Menu.Target>
        <Group>
          <Avatar src={image} size={40} radius="xl" />
          <div style={{ flex: 1 }}>
            <Text size={14} weight={500}>
              {name || "No Name"}
            </Text>
            <Text color="dimmed" size="xs">
              {email || "Noname@gmail.com"}
            </Text>
          </div>
          {icon || <IconChevronRight size={18} stroke={1.5} />}
        </Group>
      </Menu.Target>

      <Menu.Dropdown className={styles.dropdown}>
        <Menu.Item icon={<Icon3dRotate size="1.2rem" stroke={1.5} />}>
          <Text>Test</Text>
        </Menu.Item>
        <Menu.Item icon={<IconEdit size="1.2rem" stroke={1.5} />}>
          <Text>Edit account</Text>
        </Menu.Item>
        <Menu.Item
          onClick={() => logOut()}
          color="red"
          icon={<IconLogout size="1.2rem" stroke={1.5} />}
        >
          <Text>Log out</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
