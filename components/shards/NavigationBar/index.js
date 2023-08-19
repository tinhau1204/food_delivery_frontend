import { useEffect, useState } from "react";
import { createStyles, Navbar, Group, Box, Text, getStylesRef, rem } from "@mantine/core";
import { IconLayoutGridAdd, IconBorderAll, IconReceipt, IconDashboard } from "@tabler/icons";
import { UserButton } from "./UserButton";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
//import MyStoreAllProductsPage from "@/components/MyStoreAllProductsPage";

const useStyles = createStyles((theme) => ({
  header: {
    marginTop: `calc(${theme.spacing.md} * 1.5)`,
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
    label: "New Product / Types",
    icon: IconLayoutGridAdd,
  },
  // {
  //   link: "/mystore/new-product-type",
  //   label: "New Product Type",
  //   icon: IconLayoutGridAdd,
  // },
  // {
  //   link: "/mystore/all-products-types",
  //   label: "All Product Types",
  //   icon: IconBorderAll,
  // },
  {
    link: "/mystore/all-products",
    label: "All Products / Types",
    icon: IconBorderAll,
  },
  { link: "/mystore/orders", label: "Orders", icon: IconReceipt },
  // { link: "", label: "Stats", icon: IconCalendarStats },
  // { link: "", label: "Store Settings", icon: IconSettings },
];

export default function NavigationBar() {
  const { classes, cx } = useStyles();

  const router = useRouter();
  const [linkActive, setLinkActive] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [active, setActive] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [opened, setOpened] = useState(false);

  async function fetchUserData() {
    if (document.cookie.indexOf("Sel") > -1) {
      const savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
      setName(savedCookie.name);
      setEmail(savedCookie.email);
      setIsLogin(true);
    } else {
      setName("");
      setEmail("");
      setIsLogin(false);
    }
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
    if (active === "") {
      checkLinkStateAndSetNavItem();
    }
  }, []);

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
      }}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      style={{
        filter: isLogin ? "blur(0px)" : "blur(8px)",
        backgroundColor: "#1A1B1E",
        cursor: isLogin ? "auto" : "not-allowed",
        pointerEvents: isLogin ? "auto" : "none",
        borderColor: "#353a3c",
      }}
      height={"100%"}
      width={{ base: 245 }}>
      <Group position="left" className={classes.header}>
        <Image priority loader={({ src }) => src} src={"/images/logo.png"} alt="/images/default-thumbnail.jpg" height={30} width={30} />
        <Text className={styles.headertitle} size={20} color="#27ca7d">
          FD Store
        </Text>
      </Group>
      <Navbar.Section grow>
        <Box w="inherit" mr="10px" ml="10px" mt="10px" h="35rem">
          {links}
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <div className={classes.footer}>
          <UserButton email={email} name={name} />
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
