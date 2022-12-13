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
//import StoreDetailPage from "@/components/StoreDetailPage";
import Link from "next/link";

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
            maxWidth: 240,
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
            spacing={4}
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
                fontSize: 10,
              }}
            >
              {storeinfo.type_name}
            </Badge>
            <Group mt={10}>
              <Text color="gray" size={14}>
                Address:
              </Text>
              <Text
                color="black"
                size={12}
                style={{
                  maxWidth: 240,
                  overflowWrap: "break-word",
                }}
              >
                {storeinfo.address}
              </Text>
            </Group>
            <Link href={"/store/detail?id=" + storeinfo.sid}>
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
            </Link>
          </Stack>
        </Group>
      </Group>
    </>
  );
}

export default DesDetail;
