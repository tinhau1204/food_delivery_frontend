import { Container, Text, Title } from "@mantine/core";
import React from "react";

function DesDetail({ des }) {
  return (
    <Container p={0} style={{ marginLeft: 0 }}>
      <Title color="#253d4e" size={22}>
        General infomation
      </Title>
      <Text color="gray" size={18}>
        {des}
      </Text>
    </Container>
  );
}

export default DesDetail;
