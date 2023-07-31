import {
  getRecentUnseenOrdersFromStore,
  getStoreTotalProfitAndQuantityByStatus,
  getUnseenOrderFromStore,
} from "@/lib";
import {
  Group,
  Stack,
  Text,
  RingProgress,
  ThemeIcon,
  Table,
} from "@mantine/core";
import { FaDollarSign } from "react-icons/fa/";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AiFillEye } from "react-icons/ai";
import { MdAccountBalanceWallet, MdOutlineFiberNew } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import { TbPackageExport } from "react-icons/tb";
import { LuPackageCheck, LuPackageMinus } from "react-icons/lu";
import { BsClock } from "react-icons/bs";
import RealtimeClock from "../Highchart/RealtimeClock";
import Link from "next/link";
import moment from "moment";

const StatisticSection = () => {
  var savedCookie;

  const [unseenOrdersData, setUnseenOrdersData] = useState([]);
  const [recentUnseenOrdersData, setRecentUnseenOrdersData] = useState([]);
  const [totalProfit, setTotalProfit] = useState({});
  const [totalProfitPercentage, setTotalProfitPercentage] = useState(0);
  const [ringChartSections, setRingChartSections] = useState([]);

  const toolTipArr = [
    { statusID: "SUCCESS", tooltip: "Ship Success: " },
    { statusID: "PENDING", tooltip: "Not confirmed: " },
    { statusID: "SHIPPING", tooltip: "Shipping: " },
    { statusID: "CANCELLED", tooltip: "Product Cancelled: " },
    { statusID: "CONFIRMED", tooltip: "Product Confirmed: " },
    { statusID: "FAILED", tooltip: "Ship Failed: " },
  ];

  //Get data for ring chart
  useEffect(() => {
    async function getStoreProductStatus() {
      savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
      const data = {
        store_id: savedCookie.storeId,
      };
      const [response, error] = await getStoreTotalProfitAndQuantityByStatus(
        data,
      );
      if (response) {
        const totalQuantity = Object.values(response).reduce(
          (sum, item) => sum + item.tquantity,
          0,
        );
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
          const tooltipValue = toolTipArr.find(
            (item) => item.statusID === statusID,
          )?.tooltip;
          const colorValue = totalProfit[statusID]["color"];

          resultArray.push({
            value: (
              (totalProfit[statusID]?.tquantity / totalProfitPercentage) *
              100
            ).toFixed(0),
            color: colorValue,
            tooltip: tooltipValue + totalProfit[statusID]?.tquantity + " 📦",
          });
        }
      }
      setRingChartSections(resultArray);
      console.log(resultArray);
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
    async function getRecentUnseenOrders(data) {
      const [response, err] = await getRecentUnseenOrdersFromStore(data);
      if (response) {
        setRecentUnseenOrdersData(response);
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
      getRecentUnseenOrders(data);
    }
  }, []);

  return (
    <>
      <Stack h="100%" spacing={10} w="25rem">
        <Group
          position="right"
          h="4.25rem"
          spacing={20}
          style={{
            background: "#25262b",
            borderRadius: "5px",
            padding: "15px 20px",
          }}
        >
          <ThemeIcon
            color="blue"
            variant="filled"
            size="2.25rem"
            style={{ cursor: "default" }}
          >
            <BsClock size={18} />
          </ThemeIcon>
          <RealtimeClock />
        </Group>
        <Group h={"7.938rem"} spacing={10} position="apart">
          <Stack className={styles.newSection} position="apart" spacing={10}>
            <Group spacing={10}>
              <ThemeIcon size="1.6rem" color="blue">
                <AiFillEye size="1.2rem" />
              </ThemeIcon>
              <Text className={styles.labelFont}>New &nbsp;</Text>
            </Group>
            <Group spacing={5} position="right">
              {unseenOrdersData.length > 0 ? (
                <Group spacing={0} position="left" mb={5}>
                  <HiOutlineArrowNarrowUp color="#c1c2c5" size="1.4rem" />
                </Group>
              ) : (
                <></>
              )}
              <Text className={styles.valueFont}>
                {unseenOrdersData.length > 0 ? unseenOrdersData.length : 0}
              </Text>
            </Group>
          </Stack>
          <Stack
            className={styles.balanceSection}
            position="apart"
            spacing={10}
          >
            <Group spacing={10}>
              <ThemeIcon size="1.6rem" color="blue">
                <MdAccountBalanceWallet size="1.2rem" />
              </ThemeIcon>

              <Text className={styles.labelFont}>Balance &nbsp;</Text>
            </Group>
            <Group spacing={5} position="right">
              {Object.keys(totalProfit).length > 0 ? (
                <Group spacing={0} position="left" mb={5}>
                  <FaDollarSign color="#c1c2c5" size="1.4rem" />
                </Group>
              ) : (
                <></>
              )}
              <Text className={styles.valueFont}>
                {Object.keys(totalProfit).length > 0
                  ? totalProfit["SUCCESS"].tamount
                  : 0}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Group
          style={{
            background: "#25262b",
            borderRadius: "5px",
            height: "20rem",
          }}
        >
          <Stack
            className={styles.recentOrdersSection}
            position="apart"
            spacing={10}
          >
            <Group spacing={10} w="100%">
              <ThemeIcon size="1.6rem" color="blue">
                <MdOutlineFiberNew size="1.2rem" />
              </ThemeIcon>

              <Text className={styles.labelFont}>Recent Orders</Text>
              <Group ml={170}>
                <Link href="/mystore/orders">
                  <Text c="blue" className={styles.labelFont}>
                    View All
                  </Text>
                </Link>
              </Group>
            </Group>
            <Group position="right">
              <Table>
                <tbody>
                  {recentUnseenOrdersData.map((order) => (
                    <tr key={order.id}>
                      <td>{moment(order.created_date).format("DD/MM/YYYY")}</td>
                      <td>{order.product_name}</td>
                      <td>{order.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Group>
          </Stack>
        </Group>
        <Group position="center" className={styles.ringChartSection}>
          <Stack spacing={0} w={"100%"} h="100%">
            <Group spacing={10}>
              <ThemeIcon size="1.6rem" color="blue">
                <RiInformationFill size="1.2rem" />
              </ThemeIcon>
              <Text className={styles.labelFont}>Products Status</Text>
            </Group>
            {Object.keys(totalProfit).length > 0 ? (
              <Group position="center" mt={10} spacing={20}>
                <RingProgress
                  size={250}
                  thickness={16}
                  label={
                    <Stack spacing={0}>
                      <Text
                        size={16}
                        align="center"
                        px="xs"
                        sx={{ pointerEvents: "none" }}
                      >
                        Total products
                      </Text>
                      <Text
                        size={18}
                        align="center"
                        px="xs"
                        sx={{ pointerEvents: "none" }}
                      >
                        {totalProfitPercentage}
                      </Text>
                    </Stack>
                  }
                  rootColor="grey"
                  sections={ringChartSections}
                />
                <Group spacing={50}>
                  <Group position="apart" className={styles.redBorder}>
                    <ThemeIcon
                      className={styles.redPieChartSerie}
                      radius={30}
                      size="1.8rem"
                    >
                      <LuPackageMinus color="#ffffff94" size="1.3rem" />
                    </ThemeIcon>
                    <Text className={styles.piechartSeriesFont}>
                      {totalProfit["PENDING"].tquantity}
                    </Text>
                  </Group>
                  <Group position="apart" className={styles.greenBorder}>
                    <ThemeIcon
                      className={styles.greenPieChartSerie}
                      radius={30}
                      size="1.8rem"
                    >
                      <LuPackageCheck color="#ffffff94" size="1.3rem" />
                    </ThemeIcon>
                    <Text className={styles.piechartSeriesFont}>
                      {totalProfit["SUCCESS"].tquantity}
                    </Text>
                  </Group>
                  <Group position="apart" className={styles.purpleBorder}>
                    <ThemeIcon
                      className={styles.purplePieChartSerie}
                      radius={30}
                      size="1.8rem"
                    >
                      <TbPackageExport color="#ffffff94" size="1.3rem" />
                    </ThemeIcon>
                    <Text className={styles.piechartSeriesFont}>
                      {totalProfit["SHIPPING"].tquantity}
                    </Text>
                  </Group>
                </Group>
              </Group>
            ) : (
              <></>
            )}
          </Stack>
        </Group>
      </Stack>
    </>
  );
};

export default StatisticSection;
