import React from "react";
import {
  Grid,
  Paper,
  NativeSelect,
  TextInput,
  Text,
  Container,
  Group,
  ActionIcon,
  Avatar,
  Indicator,
  Select,
  Divider,
} from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLocationOn,
} from "react-icons/md";
import { GrLocation, GrApps } from "react-icons/gr";
import { CiFacebook, CiTwitter, CiInstagram, CiYoutube } from "react-icons/ci";
import { ImWhatsapp } from "react-icons/im";
import { useState } from "react";
import styles from "./styles.module.scss";
import Menu, { ListIcon } from "./components/Menu";
import Contact from "./components/Contact";
import Link from "next/link";
// import {IoLocationOutline} from 'react-icons/io';
import { useSelector } from "react-redux";
import { getCart } from "@/redux/cart";
import { getUser } from "@/redux/user";
import { useEffect } from "react";
import UserMenu from "./components/UserMenu";

function Header() {
  const [isDrop, setIsDrop] = useState(false);
  const user = useSelector(getUser);

  useEffect(() => {
    console.log("user", user);
  }, [user]);
  const data = ["All Categories", "food", "drink"];
  // const tabData = [{value:}]
  const { cart } = useSelector(getCart);
  return (
    <Container style={{ maxWidth: 1539 }} p={0}>
      <Paper shadow="xs" className={styles.header}>
        <Grid
          style={{ minHeight: 100 }}
          align="center"
          justify="center"
          columns={12}
        >
          <Grid.Col span={1}>
            <Link href="/">
              <Avatar size="md" src="" style={{ cursor: "pointer" }} />
            </Link>
          </Grid.Col>

          <Grid.Col span={2}>
            <TextInput rightSection={<FiSearch />} placeholder="Search..." />
          </Grid.Col>

          <Grid.Col span={2}>
            <Select
              data={data}
              itemProp={{ color: "green" }}
              // labelProps={style: {color: 'green'}}
              wrapperProps={{ border: "1px", boxshadow: "5px 8px" }}
              icon={<GrLocation size={14} className={styles.icon} />}
              rightSection={
                isDrop ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
              }
              onDropdownOpen={() => setIsDrop(true)}
              onDropdownClose={() => setIsDrop(false)}
              defaultValue={data[0]}
            />
          </Grid.Col>
          {/* action icon */}
          <Grid.Col span={3}>
            <Group spacing="xs" grow position="center">
              <ActionIcon size="lg" variant="subtle" color="teal">
                <Link href="/wishlist" passHref>
                  <Group spacing="xs">
                    <Indicator
                      color="green"
                      withBorder
                      label="1"
                      dot={false}
                      showZero={false}
                      overflowCount={999}
                      inline
                      size={20}
                      radius="xl"
                    >
                      <AiOutlineHeart size={20} />
                    </Indicator>
                    <Text>Wishlist</Text>
                  </Group>
                </Link>
              </ActionIcon>

              <ActionIcon size="lg" variant="subtle" color="teal">
                <Link href="/cart" passHref>
                  <Group spacing="xs">
                    <Indicator
                      color="green"
                      withBorder
                      label={cart.length}
                      dot={false}
                      showZero={false}
                      overflowCount={999}
                      inline
                      size={20}
                    >
                      <AiOutlineShoppingCart size={20} />
                    </Indicator>
                    <Text>Cart</Text>
                  </Group>
                </Link>
              </ActionIcon>

              {user.name !== undefined ? (
                <UserMenu />
              ) : (
                <ActionIcon size="lg" variant="subtle" color="teal">
                  <Link href="/login" replace>
                    <Group spacing="xs">
                      <AiOutlineUser size={20} />
                      <Text>Account</Text>
                    </Group>
                  </Link>
                </ActionIcon>
              )}
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>

      <Paper shadow="xs" style={{ minHeight: 50 }}>
        <Group spacing="xl" className={styles.subHeader}>
          <NativeSelect
            data={["All Categories", "Food", "Drink"]}
            icon={<GrApps />}
            rightSection={<MdKeyboardArrowDown />}
          />

          <Menu
            data={[
              { title: "Home", path: "/" },
              { title: "About", path: "/about" },
              { title: "Shop", path: "/store" },
            ]}
          />

          <ListIcon
            data={[
              {
                icon: <CiFacebook size={18} />,
                path: "https://www.facebook.com/",
              },
              {
                icon: <CiTwitter size={18} />,
                path: "https://www.twitter.com/",
              },
              {
                icon: <CiInstagram size={18} />,
                path: "https://www.instagram.com/",
              },
              {
                icon: <CiYoutube size={18} />,
                path: "https://www.youtube.com/",
              },
              {
                icon: <ImWhatsapp size={18} />,
                path: "https://www.whatsapp.com/",
              },
            ]}
          />
          <Divider size="sm" orientation="vertical" />

          <Contact
            phoneNumber={"(xxx) xxx-xxxx"}
            dateTime={"Mon - Sat: 7:00-20:00"}
          />
        </Group>
      </Paper>
    </Container>
  );
}

export default Header;
