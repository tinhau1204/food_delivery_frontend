import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  ActionIcon,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { introduceData, provides } from "./data";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ProvideCard from "../shards/ProvideBox";
function AboutUsPage() {
  // console.log("user", JSON.parse(sessionStorage.getItem("user")));
  const [active, setActive] = useState(introduceData[0]);
  return (
    <div className={styles.container}>
      <Group grow>
        <div className={styles.imageFrontContainer}>
          <Image
            priority
            loader={({ src }) => src}
            src={active.image}
            fit="cover"
            width={400}
            height={400}
          />
          <div className={styles.activeButtonGroup}>
            {introduceData.map((info) => (
              <div
                key={info.id}
                className={
                  active.id === info.id ? styles.active : styles.roundButton
                }
                onClick={() => setActive(info)}
              ></div>
            ))}
          </div>
        </div>
        <div className={styles.introduceContent}>
          <Stack justify="space-between">
            <Title color="white">{active.title}</Title>
            <Text weight={500} color="teal" size="xl">
              {active.content}
            </Text>
            <Text>{active.profile}</Text>
            <div className={styles.buttonContainer}>
              <ActionIcon
                className={styles.arrowButton}
                onClick={() => setActive((pre) => introduceData[pre.id - 1])}
                disabled={active.id === 0}
              >
                <BsFillArrowLeftCircleFill
                  color={active.id === 0 ? "gray" : "#3bd884"}
                  size={30}
                />
              </ActionIcon>
              <ActionIcon
                onClick={() => setActive((pre) => introduceData[pre.id + 1])}
                disabled={active.id === 2}
                className={styles.arrowButton}
              >
                <BsFillArrowRightCircleFill
                  color={active.id === 2 ? "gray" : "#3bd884"}
                  size={30}
                />
              </ActionIcon>
            </div>
          </Stack>
          <Group position="left" spacing="xl">
            {introduceData
              .filter((value) => value.id !== active.id)
              .map((value) => (
                <Image
                  priority
                  loader={({ src }) => src}
                  key={value.id}
                  src={value.image}
                  width={150}
                  height={150}
                  onClick={() => setActive(value)}
                  alt={`${value.title} banner`}
                />
              ))}
          </Group>
        </div>
      </Group>

      <div className={styles.provideContainer}>
        <Title color="white" mb={50} mt={100} justify="center" align="center">
          What We Provide?
        </Title>
        <SimpleGrid
          cols={3}
          spacing="xs"
          verticalSpacing="xs"
          breakpoints={[
            { maxWidth: 900, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {provides.map((item) => (
            <ProvideCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}

export default AboutUsPage;
