import {
  Container,
  Group,
  Text,
  Divider,
  RangeSlider,
  Stack,
  Input,
  Button,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import CateElement from "./components/CateElement";
import { GiChickenOven } from "react-icons/gi";
import ListCheckbox from "./components/ListCheckbox";

function Category() {
  //   const marks = [
  //   { value: 20, label: '20%' },
  //   { value: 50, label: '50%' },
  //   { value: 70, label: '70%' },
  //   { value: 100, label: '100%'},
  // ];

  const [sliderMin, setSliderMin] = useState(20);
  const [sliderMax, setSliderMax] = useState(100);
  useEffect(() => console.log("setSlider", sliderMin), [sliderMin]);
  return (
    <Container style={{ width: 300 }}>
      {/* Category */}
      <Group align="center" position="apart">
        <Text weight={700} size={20}>
          Category
        </Text>
        <MdKeyboardArrowRight size={20} />
      </Group>
      <Divider />
      <CateElement
        data={[
          {
            icon: <GiChickenOven size={35} color="#27ca7d" />,
            name: "Food",
            quantity: 10,
          },
          {
            icon: <GiChickenOven size={35} color="#27ca7d" />,
            name: "Drink",
            quantity: 10,
          },
          {
            icon: <GiChickenOven size={35} color="#27ca7d" />,
            name: "Vegetable",
            quantity: 10,
          },
          {
            icon: <GiChickenOven size={35} color="#27ca7d" />,
            name: "Carrot",
            quantity: 10,
          },
        ]}
      />

      {/* Slider */}
      <Group align="center" position="apart">
        <Text weight={700} size={20}>
          Fill by Price
        </Text>
        <MdKeyboardArrowRight size={20} />
      </Group>
      <Divider mb={20} />
      <Stack>
        <RangeSlider
          // marks={marks}
          thumbSize={15}
          mt="xl"
          min={20}
          max={100}
          size={5}
          // defaultValue={20}
          labelAlwaysOn
          onVolumeChange={(val) => console.log(val)}
          // labelTransition={50}
          styles={{
            thumb: { borderWidth: 1, padding: 3, borderColor: "#ccc" },
            label: {
              borderRadius: " 100% 100% 100% 0%",
              backgroundColor: "#27ca7d",
            },
          }}
        />
        <Group position="apart" style={{ flexWrap: "nowrap" }} mb={20}>
          {/* need to check the input when finish category */}
          <Input
            placeholder="Min.."
            type="number"
            onChange={(val) => setSliderMin(parseInt(val.target.value))}
          />
          {/* write set State here */}
          <Input placeholder="Max.." type="number" />
        </Group>
      </Stack>
      {/* Seasonal */}
      <Group align="center" position="apart">
        <Text weight={700} size={20}>
          Seasonal
        </Text>
        <MdKeyboardArrowRight size={20} />
      </Group>
      <Divider mb={20} />
      <ListCheckbox
        data={[
          { title: "October-February" },
          { title: "July-May" },
          { title: "November-February" },
          { title: "August-October" },
          { title: "All year long" },
          { title: "June-September" },
        ]}
      />
      {/* Manufacturer */}
      <Group align="center" position="apart">
        <Text weight={700} size={20}>
          Manufacturer
        </Text>
        <MdKeyboardArrowRight size={20} />
      </Group>
      <Divider mb={20} />
      <ListCheckbox
        data={[
          { title: "Italy" },
          { title: "Ukraine" },
          { title: "Thailand" },
          { title: "August-October" },
          { title: "All year long" },
          { title: "June-September" },
        ]}
      />

      {/* Storage conditions */}
      <Group align="center" position="apart">
        <Text weight={700} size={20}>
          Storage conditions
        </Text>
        <MdKeyboardArrowRight size={20} />
      </Group>
      <Divider mb={20} />
      <Button variant="light" color="teal" style={{ width: "100%" }}>
        Filter
      </Button>
    </Container>
  );
}

export default Category;
