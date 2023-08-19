import { getMostSoldProductsFromStore, getStoreTotalProfitAndQuantityByStatus, getUnseenOrderFromStore } from "@/lib";
import { Group, Stack, Text, RingProgress, ThemeIcon, Grid, TextInput, ActionIcon, createStyles, Loader } from "@mantine/core";
import { FaDollarSign } from "react-icons/fa/";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AiFillEye } from "react-icons/ai";
import { MdAccountBalanceWallet, MdOutlineFiberNew } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import { BsClock } from "react-icons/bs";
import RealtimeClock from "../Highchart/RealtimeClock";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  "buttonNgu::before": {
    content: '""',
    backgroundColor: theme.colorScheme === "dark" ? "transparent" : "transparent",
    cursor: "not-allowed",
  },
}));

const StatisticSection = () => {
  var savedCookie;

  const [unseenOrdersData, setUnseenOrdersData] = useState([]);
  const [mostSoldProductsData, setMostSoldProductsData] = useState([]);
  const [totalProfit, setTotalProfit] = useState({});
  const [totalProfitPercentage, setTotalProfitPercentage] = useState(0);
  const [ringChartSections, setRingChartSections] = useState([]);
  const [ringChartSectionHovered, setRingChartSectionHovered] = useState(-1);
  const reset = () => setRingChartSectionHovered(-1);

  const toolTipArr = [
    { statusID: "SUCCESS", tooltip: "Ship Success: " },
    { statusID: "PENDING", tooltip: "Not confirmed: " },
    { statusID: "SHIPPING", tooltip: "Shipping: " },
    { statusID: "CANCELLED", tooltip: "Product Cancelled: " },
    { statusID: "CONFIRMED", tooltip: "Product Confirmed: " },
    { statusID: "FAILED", tooltip: "Ship Failed: " },
  ];

  const { classes } = useStyles();

  //Get data for ring chart
  useEffect(() => {
    async function getStoreProductStatus() {
      savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
      const data = {
        store_id: savedCookie.storeId,
      };
      const [response, error] = await getStoreTotalProfitAndQuantityByStatus(data);
      if (response) {
        const totalQuantity = Object.values(response).reduce((sum, item) => sum + item.tquantity, 0);
        setTotalProfitPercentage(totalQuantity);
        setTotalProfit(response);
        //console.log(response);
      } else {
        console.log(error);
      }
    }
    getStoreProductStatus();
  }, []);

  //Create array of sections value for ring chart
  useEffect(() => {
    if (Object.keys(totalProfit).length != 0) {
      const resultArray = [];

      for (const statusID in totalProfit) {
        if (totalProfit.hasOwnProperty(statusID)) {
          //If statusID from response exist in init array "toolTipArr" then turn it to section
          const tooltipValue = toolTipArr.find((item) => item.statusID === statusID)?.tooltip;
          const colorValue = totalProfit[statusID]["color"];

          //Chart's sections
          resultArray.push({
            value: ((totalProfit[statusID]?.tquantity / totalProfitPercentage) * 100).toFixed(0) - 1,
            color: colorValue,
            onMouseEnter: () => setRingChartSectionHovered(Object.keys(totalProfit).indexOf(statusID)),
            onMouseLeave: reset,
            tooltip: tooltipValue + totalProfit[statusID]?.tquantity + " 📦",
          });

          //Space between sections
          resultArray.push({
            value: 1,
            color: "#25262b",
          });
        }
      }
      setRingChartSections(resultArray);
    }
  }, [totalProfit]);

  //Get new , (recent) unseen orders,
  useEffect(() => {
    async function getUnseenOrders(data) {
      const [response, err] = await getUnseenOrderFromStore(data);
      if (response) {
        setUnseenOrdersData(response);
      } else {
        console.log(err);
      }
    }
    async function getmostSoldProducts(data) {
      const [response, err] = await getMostSoldProductsFromStore(data);
      if (response) {
        setMostSoldProductsData(response);
      } else {
        console.log(err);
      }
    }
    savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
    if (savedCookie !== null && savedCookie !== undefined) {
      const data = {
        store_id: savedCookie.storeId,
      };
      getUnseenOrders(data);
      getmostSoldProducts(data);
    }
  }, []);

  return (
    <Stack spacing={10}>
      <Group position="right" spacing={20} className={styles.clockSection}>
        <ThemeIcon color="blue" variant="filled" size="2.25rem">
          <BsClock size={18} />
        </ThemeIcon>
        <RealtimeClock />
      </Group>

      <Grid gutter={10}>
        <Grid.Col span={5}>
          <Stack className={styles.newSection} spacing={20}>
            <Group spacing={10}>
              <ThemeIcon size="1.6rem" color="blue">
                <AiFillEye size="1.2rem" />
              </ThemeIcon>
              <Text className={styles.labelFont}>New &nbsp;</Text>
            </Group>
            <Group spacing={5} position="right">
              {unseenOrdersData.length > 0 ? (
                <Group spacing={0} position="left" mb={5}>
                  <HiOutlineArrowNarrowUp color="#c1c2c5" size="1.2rem" />
                </Group>
              ) : (
                <></>
              )}
              <Text className={styles.valueFont}>{unseenOrdersData.length > 0 ? unseenOrdersData.length : 0}</Text>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={7}>
          <Stack className={styles.balanceSection} spacing={20}>
            <Group spacing={10}>
              <ThemeIcon size="1.6rem" color="blue">
                <MdAccountBalanceWallet size="1.2rem" />
              </ThemeIcon>
              <Text className={styles.labelFont}>Balance &nbsp;</Text>
            </Group>
            <Group spacing={5} position="right">
              {Object.keys(totalProfit)?.length > 0 ? (
                <Group spacing={0} position="left" mb={5}>
                  <FaDollarSign color="#c1c2c5" size="1.2rem" />
                </Group>
              ) : (
                <></>
              )}
              <Text className={styles.valueFont}>{Object.keys(totalProfit)?.length > 0 ? totalProfit["SUCCESS"].tamount : 0}</Text>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
      <Group className={styles.bestSoldProductsSection}>
        <Stack w="100%" position="apart" spacing={10}>
          <Group position="apart">
            <Group spacing={10}>
              <ThemeIcon size="1.6rem" color="blue">
                <MdOutlineFiberNew size="1.2rem" />
              </ThemeIcon>

              <Text className={styles.labelFont}>Best Sold Products</Text>
            </Group>
            <Link href="/mystore/orders">
              <Text c="blue" className={styles.labelFont}>
                View All
              </Text>
            </Link>
          </Group>
          <Stack position="left" mt={10} w="80%" spacing={10}>
            <Stack spacing={5}>
              <Text className={styles.labelFont}>{mostSoldProductsData[0]?.product_name}</Text>
              <div className={styles.firstRankColumn} />
            </Stack>
            <Stack spacing={5}>
              <Text className={styles.labelFont}>{mostSoldProductsData[1]?.product_name}</Text>
              <div className={styles.secondRankColumn} />
            </Stack>
            <Stack spacing={5}>
              <Text className={styles.labelFont}>{mostSoldProductsData[2]?.product_name}</Text>
              <div className={styles.thirdRankColumn} />
            </Stack>
          </Stack>
        </Stack>
      </Group>
      <Group className={styles.ringChartSection}>
        <Stack w="100%" spacing={0}>
          <Group spacing={10}>
            <ThemeIcon size="1.6rem" color="blue">
              <RiInformationFill size="1.2rem" />
            </ThemeIcon>
            <Text className={styles.labelFont}>Products Status</Text>
          </Group>
          {Object.keys(totalProfit).length > 0 ? (
            <Group spacing={20}>
              <RingProgress
                style={{ translate: "-20px" }}
                onMouseLeave={() => setRingChartSectionHovered(-1)}
                size={220}
                thickness={14}
                label={
                  <Stack spacing={0}>
                    <Text size={14} align="center" px="xs" className={styles.labelFont}>
                      Total products
                    </Text>
                    <Text size={18} align="center" mt={5} px="xs" sx={{ pointerEvents: "none" }}>
                      {totalProfitPercentage}
                    </Text>
                  </Stack>
                }
                rootColor="grey"
                sections={ringChartSections}
              />

              <Text>Hovered section: {ringChartSectionHovered === -1 ? "0" : ringChartSectionHovered}</Text>
            </Group>
          ) : (
            <></>
          )}
        </Stack>
      </Group>
    </Stack>
  );
};

export default StatisticSection;
