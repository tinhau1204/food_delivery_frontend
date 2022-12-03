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
function Footer() {
  const primaryColor = "#008080";
  return (
    <Container>
      <Group>
        <Stack align="flex-start">
          <Avatar size="md" src="" />
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

        <HorizontalList
          data={[
            { title: "Company" },
            { title: "About Us", path: "/about" },
            { title: "Service", path: "/service" },
            { title: "Case Studies", path: "/case" },
            { title: "Blog", path: "/blog" },
            { title: "Contact", path: "/contact" },
          ]}
        />

        <HorizontalList
          data={[
            { title: "Account" },
            { title: "Sign in", path: "/login" },
            { title: "View Cart", path: "/cart" },
            { title: "My Wishlist", path: "/wishlist" },
            { title: "Track My Order", path: "/oder" },
            { title: "Compare products", path: "/compare" },
          ]}
        />
      </Group>
      {/* <Space h="xl"/> */}
      <Divider my="xl" />
    </Container>
  );
}

export default Footer;
