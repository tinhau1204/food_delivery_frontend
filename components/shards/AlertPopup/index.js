import React from "react";
import { Alert, Button, Center } from "@mantine/core";
import Link from "next/link";

export default function AlertPopup({ Title, Content, LinkRef, ButtonName }) {
  return (
    <div>
      <Alert
        title={Title}
        style={{
          background: "#005a32",
          zIndex: 100,
          width: 350,
          height: "fit-content",
          overflow: "auto",
          wordBreak: "break-word",
          position: "absolute",
          left: "40%",
          top: "40%",
          transform: "translate (-50%,-50%)",
        }}
      >
        {Content}
        <Center style={{ paddingTop: 20 }}>
          {LinkRef != "none" ? (
            <Link href={LinkRef}>
              <Button variant="outline" color="teal" type="submit">
                {ButtonName}
              </Button>
            </Link>
          ) : (
            <Button variant="outline" color="teal" type="submit">
              {ButtonName}
            </Button>
          )}
        </Center>
      </Alert>
    </div>
  );
}
