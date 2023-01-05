import React, { useState, useEffect } from "react";

import { Avatar, Stack, Grid } from "@mantine/core";
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
//import { getBotData } from "@/lib/api/bot";

import List, { HorizontalList } from "./components/List";
import styles from "./styles.module.scss";
function Footer() {
  const primaryColor = "#008080";

  const [html, setHTML] = useState({ __html: "" });
  const chatbot_url = process.env.NEXT_PUBLIC_CHATBOT_API;

  useEffect(() => {
    const getChatBot = () => {
      fetch(chatbot_url)
        .then(async (data) => {
          const backendHtmlString = await data.text();
          let formatString = backendHtmlString
            .split("<body>")[1]
            .split("</body>")[0];
          setHTML({ __html: formatString });
          const head = document.querySelector("head");
          head.innerHTML += `<link rel="stylesheet" href="${chatbot_url}/static/style.css">`;
          let a = document.querySelector(
            `script[src="${chatbot_url}/static/app.js"]`,
          );
          if (!a) {
            const script = document.createElement("script");
            script.async = true;
            script.src = chatbot_url + "/static/app.js";

            document.body.appendChild(script);
          }
        })
        .catch((err) => {
          console.log("Can't fetch chatbot url");
        });
    };

    getChatBot();
  }, []);

  return (
    <>
      <Grid
        columns={12}
        justify="space-evenly"
        align="flex-start"
        className={styles.footer}
      >
        <Grid.Col span={3} style={{ flex: 1 }}>
          <Stack align="flex-start">
            {/* <Avatar size="md" fit="contain" src="/images/logo.png" /> */}
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
                  title: "(xxx) xxx-xxxx",
                },
                {
                  icon: <CiMail size={18} color={primaryColor} />,
                  space: 10,
                  title: "hcmute@student.edu.vn",
                },
                {
                  icon: <CiLocationOn size={18} color={primaryColor} />,
                  space: 10,
                  title: "01 Vo Van Ngan",
                },
                {
                  icon: <GiAlarmClock size={18} color={primaryColor} />,
                  space: 10,
                  title: "7:00 - 18:00, Mon - Sat",
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
              { title: "Track My Order", path: "/history" },
            ]}
          />
        </Grid.Col>
      </Grid>
      {html && <div dangerouslySetInnerHTML={html} />}
    </>
  );
}

export default Footer;
