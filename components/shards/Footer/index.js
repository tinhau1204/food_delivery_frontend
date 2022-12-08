import React from "react";
import {
  Avatar,
  Group,
  Stack,
  Grid,
  Container,
  Divider,
  Space,
} from "@mantine/core";
import { ListIcon } from "../Header/components/Menu";
import {
  CiFacebook,
  CiTwitter,
  CiInstagram,
  CiYoutube,
  CiMail,
  CiLocationOn,
  CiPhone,
} from "react-icons/ci";
import { GiAlarmClock } from "react-icons/gi";
import { ImWhatsapp } from "react-icons/im";
import List, { HorizontalList } from "./components/List";
import styles from "./styles.module.scss";
function Footer() {
  const primaryColor = "#008080";
  return (
    <Grid
      columns={12}
      justify="space-evenly"
      align="flex-start"
      className={styles.footer}
    >
      <Grid.Col span={3} style={{ flex: 1 }}>
        <Stack align="flex-start">
          <Avatar size="md" src="https://i.imgur.com/qw6oWmE.png" />
          <ListIcon
            data={[
              {
                icon: <CiFacebook size={18} />,
                path: "https://www.facebook.com/",
              },
              {
                icon: <CiTwitter size={18} />,
                path: "https://www.twitter.com",
              },
              {
                icon: <CiInstagram size={18} />,
                path: "https://www.instagram.com",
              },
              {
                icon: <CiYoutube size={18} />,
                path: "https://www.youtube.com",
              },
              {
                icon: <ImWhatsapp size={18} />,
                path: "https://www.whatsapp.com",
              },
            ]}
          />
          <List
            data={[
              {
                icon: <CiPhone size={18} color={primaryColor} />,
                space: 10,
                title: "(684) 555-0120",
              },
              {
                icon: <CiMail size={18} color={primaryColor} />,
                space: 10,
                title: "name@gmail.com",
              },
              {
                icon: <CiLocationOn size={18} color={primaryColor} />,
                space: 10,
                title: "6391 Elgin St. Celina, Delaware 10299",
              },
              {
                icon: <GiAlarmClock size={18} color={primaryColor} />,
                space: 10,
                title: "10:00 - 18:00, Mon - Sat",
              },
            ]}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={3} style={{ flex: 1 }}>
        <HorizontalList
          data={[
            { title: "Company" },
            { title: "About Us", path: "/about" },
            { title: "Service", path: "/" },
            { title: "Case Studies", path: "/case" },
            { title: "Blog", path: "/blog" },
            { title: "Contact", path: "/contact" },
          ]}
        />
      </Grid.Col>

      <Grid.Col span={2} style={{ flex: 1 }}>
        <HorizontalList
          data={[
            { title: "Account" },
            { title: "Sign in", path: "/login" },
            { title: "View Cart", path: "/cart" },
            { title: "My Wishlist", path: "/wishlist" },
            { title: "Track My Order", path: "/order" },
          ]}
        />
      </Grid.Col>
    </Grid>
  );
}

export default Footer;
