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
import * as Bs from "react-icons/bs";
import ProvideCard from "../shards/ProvideBox";
function AboutUsPage() {
  // console.log("user", JSON.parse(sessionStorage.getItem("user")));
  const [active, setActive] = useState(introduceData[0]);
  return (
    <div className={styles.container}>
      <Group grow>
        <div className={styles.imageContainer}>
          <Image src={active.image} fit="fill" width={400} height={400} />
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
            <Title color="#253d4e">{active.title}</Title>
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
                <Bs.BsFillArrowLeftCircleFill
                  color={active.id === 0 ? "gray" : "#3bd884"}
                  size={30}
                />
              </ActionIcon>
              <ActionIcon
                onClick={() => setActive((pre) => introduceData[pre.id + 1])}
                disabled={active.id === 3}
                className={styles.arrowButton}
              >
                <Bs.BsFillArrowRightCircleFill
                  color={active.id === 3 ? "gray" : "#3bd884"}
                  size={30}
                />
              </ActionIcon>
            </div>
          </Stack>
          <Group grow spacing="xs" position="Apart">
            {introduceData
              .filter((value) => value.id !== active.id)
              .map((value) => (
                <Image
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
        <Title color="#253d4e" mb={10}>
          What We Provide?
        </Title>
        <SimpleGrid
          col={3}
          breakpoints={[
            { maxWidth: 1539, cols: 3, spacing: "md" },
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
