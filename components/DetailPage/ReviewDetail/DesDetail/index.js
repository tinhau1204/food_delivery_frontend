import {
  Container,
  Text,
  Title,
  Image,
  Stack,
  Group,
  Button,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import React from "react";

function DesDetail({ storeinfo }) {
  const img_load = process.env.NEXT_PUBLIC_IPFS_URL;

  return (
    <>
      <Group
        style={{
          border: "1px solid #ccc",
          marginTop: 20,
          borderRadius: 5,
          paddingBottom: 10,
          width: "fit-content",
        }}
      >
        <Stack
          style={{
            maxWidth: 220,
            marginTop: 10,
            marginLeft: 20,
            marginRight: -20,
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              marginRight: 20,
              overflowWrap: "break-word",
            }}
          >
            <Image
              radius="md"
              src={img_load + storeinfo.image}
              alt="Store Image"
            />
          </div>
        </Stack>
        <Group>
          <Stack
            spacing={5}
            align="flex-start"
            justify="flex-start"
            mt={10}
            mr={20}
          >
            <Title color="#253d4e" size={18}>
              {storeinfo.name}
            </Title>
            <Badge
              color="pink"
              variant="light"
              style={{
                fontSize: 12,
              }}
            >
              {storeinfo.type_name}
            </Badge>
            <Text color="gray" size={14} mt={10} mb={5}>
              Address: &nbsp;&nbsp;{storeinfo.address}
            </Text>
            <Button
              mb={1}
              variant="outline"
              textAlign="center"
              style={{
                width: "100%",
              }}
            >
              Visit
            </Button>
          </Stack>
        </Group>
      </Group>
    </>
  );
}

export default DesDetail;
