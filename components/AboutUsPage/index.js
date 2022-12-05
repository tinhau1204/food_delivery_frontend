import { ActionIcon, Group, Image, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import styles from './styles.module.scss';
import { introduceData, provides } from './data';
import * as Bs from 'react-icons/bs';
import ProvideCard from '../shards/ProvideBox';

const AboutUsPage = () =>{
    const [active,setActive] = useState(introduceData[0])
    console.log(active)
    return(
        <div className={styles.container}>
            <Group grow>
                <div className={styles.imageContainer}>
                    <Image 
                    src={active.image}
                    fit='fill'
                    width={400}
                    height={400}
                    />
                    <div 
                    className={styles.activeButtonGroup}>
                        {
                            introduceData.map(info =>
                                <div className={active.id === info.id ? 
                                        styles.active 
                                        : styles.roundButton}
                                        onClick={() => setActive(info)}>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={styles.introduceContent}>
                    <Stack justify='space-between'>
                        <Title>{active.title}</Title>
                        <Text>{active.content}</Text>
                        <div className={styles.buttonContainer}>
                            <ActionIcon 
                            className={styles.arrowButton}
                            onClick={() => setActive(pre => introduceData[pre.id - 1])}
                            disabled = {active.id === 0}
                            >
                                <Bs.BsFillArrowLeftCircleFill 
                                    color={active.id === 0 ? 'gray':'#3bd884'}
                                    size={30}
                                />
                            </ActionIcon>
                            <ActionIcon 
                            onClick={() => setActive(pre => introduceData[pre.id + 1])}
                            disabled = {active.id === 3}
                            className={styles.arrowButton}
                            >
                                <Bs.BsFillArrowRightCircleFill 
                                color={active.id === 3 ? 'gray' : '#3bd884'}
                                size={30}
                                />
                            </ActionIcon>
                        </div>
                    </Stack>
                    <Group grow spacing='xs' position='Apart'>
                            {
                                introduceData
                                .filter(value => value.id !== active.id)
                                .map(value => 
                                    <Image src={value.image}
                                        width={150}
                                        height={150}
                                        onClick={() => setActive(value)}
                                    />
                                )
                            }
                    </Group>
                </div>

            </Group>

            <div className={styles.provideContainer}>
                <Title>What We Provide?</Title>
                <div className={styles.contentProvide}>
                    {
                    provides.map(item => (
                    <ProvideCard
                        key = {item.id}
                        icon={item.icon}
                        title = {item.title}
                        text = {item.text}
                    />
                    ))
                    }
                </div>
            </div> 
        </div>
        )
}
export default AboutUsPage;