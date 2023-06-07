import { Avatar, Button, Card, Stack, Text, Title } from "@mantine/core";
import styles from "./styles.module.scss";
import { HiArrowNarrowRight } from "react-icons/hi";

const ProvideCard = (props) => {
  const { icon, title, text } = props;
  return (
    <Card className={styles.card}>
      <Stack align="center" justify="center">
        <Card.Section>
          <Avatar radius="xl" size="lg">
            {icon}
          </Avatar>
        </Card.Section>
        <Card.Section>
          <Stack spacing="sm" justify="center" align="center">
            <Title size={"h3"} color="white">
              {title}
            </Title>
            <Text size="sm" color="white" align="center">
              {text}
            </Text>
            <Button rightIcon={<HiArrowNarrowRight />} color="teal">
              Read more
            </Button>
          </Stack>
        </Card.Section>
      </Stack>
    </Card>
  );
};

export default ProvideCard;
