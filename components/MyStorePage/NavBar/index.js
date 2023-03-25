import { useEffect, useState } from "react";
import { Navbar, Group, NavLink, Box, Avatar, Text } from "@mantine/core";
import {
  IconLayoutGridAdd,
  IconCalendarStats,
  IconBorderAll,
  IconSettings,
  Icon2fa,
  IconReceipt,
  IconDashboard,
  IconLogout,
} from "@tabler/icons";
import { UserButton } from "../UserButton";
import styles from "./styles.module.scss";
import Image from "next/image";
//import image from "../public/Mustifi.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const data = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/new-product", label: "New Product", icon: IconLayoutGridAdd },
  {
    link: "/new-product-type",
    label: "New Product Type",
    icon: IconLayoutGridAdd,
  },
  {
    link: "/all-product-types",
    label: "All Product Types",
    icon: IconBorderAll,
  },
  { link: "/all-products", label: "All Products", icon: IconBorderAll },
  { link: "/orders", label: "Orders", icon: IconReceipt },
  // { link: "", label: "Stats", icon: IconCalendarStats },
  // { link: "", label: "Store Settings", icon: IconSettings },
];

export default function NavbarSimple() {
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function fetchUserData() {
    const userId = sessionStorage.getItem("User");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/account/get-account/${userId}`,
    );
    setName(response.data.name);
    setEmail(response.data.email);
  }

  useEffect(() => {
    fetchUserData();
  });

  const [navLinkActive, setNavLinkActive] = useState(0);

  const links = data.map((item, index) => (
    <Link href={item.link}>
      <NavLink
        mt={5}
        mb={5}
        ref={item.link}
        key={item.label}
        active={index === navLinkActive}
        label={item.label}
        icon={<item.icon size="1.8rem" stroke={1.5} />}
        onClick={() => setNavLinkActive(index)}
      />
    </Link>
  ));

  return (
    <Navbar width={{ sm: 245 }}>
      <Navbar.Section grow>
        {/* <Group
          className={styles.header}
          position="left"
          mt={5}
          mr={5}
          ml={5}
          mb={5}
        >
          <Image
            src={"/images/logo.png"}
            height="30%"
            width="30%"
            layout="fixed"
            alt={""}
          />
          <Text
            size={20}
            color="green"
            fw={700}
            sx={{
              fontFamily: "Varela Round",
              fontStyle: "normal",
              fontDisplay: "swap",
            }}
          >
            MY STORE
          </Text>
        </Group> */}
        <Box w="inherit" mr="5px" ml="5px">
          {links}
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <UserButton email={email} name={name} />
      </Navbar.Section>
    </Navbar>
  );
}
