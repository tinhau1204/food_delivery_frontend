
import { Avatar, Button, Card, Text, Title } from '@mantine/core';
import styles from './styles.module.scss';

const ProvideCard = (props) => {
    const { icon, title, text} = props;
    // console.log(new URL(icon, document.baseURI).href)
    return(
        <Card>
            <Card.Section>
                <Avatar radius='xl' src={icon} />
            </Card.Section>
            <Card.Section>
                <Title size={'h2'}>
                {title}
                </Title>
                <Text>
                {text}
                </Text>
                <Button>
                    Read more
                </Button>

            </Card.Section>
        </Card>
    )
}

export default ProvideCard;