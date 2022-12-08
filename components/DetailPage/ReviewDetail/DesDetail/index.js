import { Container, Text, Title } from "@mantine/core";
import React from "react";

function DesDetail({ des }) {
  return (
    <Container p={0} style={{ marginLeft: 0 }}>
      <Title color="#253d4e" size={20}>
        General infomation about figs
      </Title>
      <Text color="gray" size="sm">
        {des}Lorem ipsum dolor sit amet, consectetur adip
      </Text>
    </Container>
  );
}

export default DesDetail;
