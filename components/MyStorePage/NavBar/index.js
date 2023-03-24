import { useEffect, useState } from "react";
import { createStyles, Navbar, Group } from "@mantine/core";
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
import Image from "next/image";
//import image from "../public/Mustifi.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    root: {
      position: "fixed",
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

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
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
  const [name, setName] = useState("");

  async function fetchUserData() {
    const userId = sessionStorage.getItem("User");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/account/get-account/${userId}`,
    );
    setName(response.data.name);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.link);
      }}
    >
      <div>
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </div>
    </Link>
  ));

  // useEffect(() => {
  //   console.log(router);
  // }, [router]);

  return (
    <Navbar className={classes.root} width={{ sm: 240 }} p="md">
      <Navbar.Section grow>
        {/* <Group className={classes.header} position="apart">
          <Image src={image} height={50} width={100} alt={""} />
        </Group> */}
        {links}
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <UserButton email={name} />
      </Navbar.Section>
    </Navbar>
  );
}
