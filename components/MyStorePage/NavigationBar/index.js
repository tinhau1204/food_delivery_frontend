import { useEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  NavLink,
  Box,
  Avatar,
  Text,
  Code,
  getStylesRef,
  AppShell,
  rem,
} from "@mantine/core";
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
//import { accountInfoGetWithId } from "@/lib";
//import image from "../public/Mustifi.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  header: {
    marginTop: "18px",
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${"#353a3c"}`,
    width: "92%",
    marginLeft: "10px",
    paddingLeft: "8px",
  },

  footer: {
    borderTop: `${rem(1)} solid ${"#353a3c"}`,
    width: "92%",
    marginLeft: "10px",
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[4],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#353a3c",
      color: theme.white,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.white,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colors.gray[4],
    marginRight: theme.spacing.sm,
  },

  linkSelected: {
    "&, &:hover": {
      backgroundColor: "#27ca7e28",
      color: "#27ca7d",

      [`& .${getStylesRef("icon")}`]: {
        color: "#27ca7d",
      },
    },
  },
}));

const data = [
  { link: "/mystore", label: "Dashboard", icon: IconDashboard },
  {
    link: "/mystore/new-product",
    label: "New Product",
    icon: IconLayoutGridAdd,
  },
  // {
  //   link: "/mystore/new-product-type",
  //   label: "New Product Type",
  //   icon: IconLayoutGridAdd,
  // },
  {
    link: "/mystore/all-products-types",
    label: "All Product Types",
    icon: IconBorderAll,
  },
  { link: "/mystore/all-products", label: "All Products", icon: IconBorderAll },
  { link: "/orders", label: "Orders", icon: IconReceipt },
  // { link: "", label: "Stats", icon: IconCalendarStats },
  // { link: "", label: "Store Settings", icon: IconSettings },
];

export default function NavigationBar() {
  const { classes, cx } = useStyles();

  const router = useRouter();
  const [linkActive, setLinkActive] = useState("");
  const [active, setActive] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function fetchUserData() {
    // const userId = sessionStorage.getItem("User");
    // const [response, error] = await accountInfoGetWithId(userId);
    // if (response != null || response != undefined) {

    // }
    const savedCookie = JSON.parse(document.cookie.split("User=")[1]);
    setName(savedCookie.name);
    setEmail(savedCookie.email);
  }

  useEffect(() => {
    router.push(linkActive, undefined, { shallow: true });
  }, [linkActive]);

  useEffect(() => {
    fetchUserData();
  });

  //set nav item actived according to the current url
  function checkLinkStateAndSetNavItem() {
    for (let i = 0; i < data.length; i++) {
      if (router.pathname === data[i].link) {
        setActive(data[i].label);
        break;
      }
    }
  }

  //check and confirm page refresh (F5)
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    if (active === "") {
      checkLinkStateAndSetNavItem();
    }
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkSelected]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setLinkActive(item.link);
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      style={{
        backgroundColor: "#1a1b1e",
        borderColor: "#353a3c",
        position: "absolute",
        left: 0,
      }}
      width={{ sm: 255 }}
    >
      <Navbar.Section grow>
        <Group position="left" className={classes.header}>
          <Image
            src={"/images/logo.png"}
            height="30%"
            width="30%"
            layout="fixed"
            alt={""}
          />
          <Text className={styles.headertitle} size={20} color="#27ca7d">
            FD Store
          </Text>
        </Group>
        <Box w="inherit" mr="10px" ml="10px" mt="10px">
          {links}
        </Box>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <div>
          <UserButton email={email} name={name} />
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
