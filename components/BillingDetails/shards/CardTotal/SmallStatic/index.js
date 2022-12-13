import React from "react";
import {
  Container,
  Avatar,
  Stack,
  Text,
  Group,
  Divider,
  Center,
  Grid,
} from "@mantine/core";
function SmallStatic({ subtotal, shipping, tax, total }) {
  return (
    <Container px="md" style={{ width: 400 }}>
      {/* Sub total */}
      <Grid columns={12} align="center">
        <Grid.Col span={9}>
          <Text weight={700} size="xl" color="#253d4e">
            Sub Total:
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text
            color="#334959"
            style={{ lineHeight: "100%", textAlign: "end" }}
          >
            {/* SubTotal */}
            {"$" + subtotal}
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="sm" variant="dashed" />
      {/* Shipping */}
      <Grid columns={12} align="center">
        <Grid.Col span={9}>
          <Text weight={700} size="xl" color="#253d4e">
            Shipping:
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text
            color="#334959"
            style={{ lineHeight: "100%", textAlign: "end" }}
          >
            {"$" + shipping}
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="sm" variant="dashed" />
      {/* Estimated Tax */}
      <Grid columns={12} align="center">
        <Grid.Col span={9}>
          <Text weight={700} size="xl" color="#253d4e">
            Estimated Tax:
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text
            color="#334959"
            style={{ lineHeight: "100%", textAlign: "end" }}
          >
            {"$" + tax}
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="md" variant="solid" />
      {/* Total */}
      <Grid columns={12} align="center">
        <Grid.Col span={9}>
          <Text weight={700} size="xl" color="#253d4e">
            Total:
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text
            color="#334959"
            style={{ lineHeight: "100%", textAlign: "end" }}
          >
            {"$" + total}
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
export default SmallStatic;
