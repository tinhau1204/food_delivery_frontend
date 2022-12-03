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
// import {IoLocationOutline} from 'react-icons/io';
function Header() {
  const [isDrop, setIsDrop] = useState(false);

  const data = ["All Categories", "food", "drink"];
  // const tabData = [{value:}]

  return (
    <>
      <Paper shadow="xs" className={styles.header}>
        <Grid
          style={{ minHeight: 100, marginLeft: 100, marginRight: 100 }}
          align="center"
        >
          <Grid.Col span={1}>
            <Avatar size="md" src="" />
          </Grid.Col>

          <Grid.Col span={3}>
            <TextInput rightSection={<FiSearch />} placeholder="Search..." />
          </Grid.Col>

          <Grid.Col span={2}>
            <Select
              data={data}
              itemProp={{ color: "green" }}
              // labelProps={style: {color: 'green'}}
              wrapperProps={{ border: "1px", boxShadow: "5px 8px" }}
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
          <Grid.Col span={4}>
            <Group spacing="xs" grow position="center">
              <ActionIcon size="xs" variant="transparent">
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
              </ActionIcon>

              <ActionIcon size="lg" variant="transparent">
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
                  >
                    <AiOutlineShoppingCart size={20} />
                  </Indicator>
                  <Text>Cart</Text>
                </Group>
              </ActionIcon>

              <ActionIcon size="lg" variant="transparent">
                <Group spacing="xs">
                  <AiOutlineUser size={20} />
                  <Text>Account</Text>
                </Group>
              </ActionIcon>
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
              { title: "Shop", path: "/shop" },
              { title: "Blog", path: "/blog" },
              { title: "Our Team", path: "/ourteam" },
              { title: "Contact", path: "/contact" },
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
            phoneNumber={"(046) 555-0120"}
            dateTime={"Mon - Fri: 9:00-20:00"}
          />
        </Group>
      </Paper>
    </>
  );
}

export default Header;
