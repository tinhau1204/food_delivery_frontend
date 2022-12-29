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
import { GiChickenOven, GiHamburger, GiSlicedBread } from "react-icons/gi";
import { MdFastfood, MdLocalDrink } from "react-icons/md";
import ListCheckbox from "./components/ListCheckbox";

function Category({ onClickCate, getType }) {
  const [sliderMin, setSliderMin] = useState(20);
  const [sliderMax, setSliderMax] = useState(100);
  const filterType = (name) => {
    const filter = getType.filter((val) =>
      name == "Food" ? val.type != "drink" : val.type == name.toLowerCase(),
    );
    return filter.length;
  };

  return (
    <Container style={{ width: 300, marginLeft: 100, marginRight: 100 }}>
      {/* Category */}
      <Group align="center" position="apart">
        <Text weight={700} size={20} color="#253d4e">
          Category
        </Text>
        <MdKeyboardArrowRight size={20} />
      </Group>
      <Divider />
      <CateElement
        data={[
          {
            icon: <MdFastfood size={35} color="#27ca7d" />,
            name: "Food",
            quantity: filterType("Food"),
          },
          {
            icon: <MdLocalDrink size={35} color="#27ca7d" />,
            name: "Drink",
            quantity: filterType("Drink"),
          },
          {
            icon: <GiHamburger size={35} color="#27ca7d" />,
            name: "Hamburger",
            quantity: filterType("Hamburger"),
          },
          {
            icon: <GiSlicedBread size={35} color="#27ca7d" />,
            name: "Bread",
            quantity: filterType("Bread"),
          },
        ]}
        onclickcate={(val) => onClickCate(val)}
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
