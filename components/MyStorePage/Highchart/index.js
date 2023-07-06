import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {
  getStoreProfit,
  getStoreTotalProfitAndQuantityByStatus,
  getUnseenOrderFromStore,
} from "@/lib";
import {
  Group,
  Button,
  Stack,
  ActionIcon,
  Text,
  Tabs,
  RingProgress,
  ThemeIcon,
} from "@mantine/core";
import { FaRegCalendarAlt } from "react-icons/fa/";
import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  BsDatabaseFillX,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsClock,
} from "react-icons/bs";
import RealtimeClock from "./RealtimeClock";
import styles from "./styles.module.scss";
import { AiFillEye } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import { TbPackageExport } from "react-icons/tb";
import { LuPackageCheck, LuPackageMinus } from "react-icons/lu";

const Highchart = () => {
  const chartRef = useRef();
  var savedCookie;

  const [isMonthsChange, setIsMonthsChange] = useState(false);
  const [monthTabValue, setMonthTabValue] = useState("");
  const [yearTabValue, setYearTabValue] = useState("");
  const [unseenOrdersData, setUnseenOrdersData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [buttonLoading, SetButtonLoading] = useState(false);
  const [totalProfit, setTotalProfit] = useState({});
  const [totalProfitPercentage, setTotalProfitPercentage] = useState(0);

  const monthsFirstArr = [
    { id: "1", value: "Jan" },
    { id: "2", value: "Feb" },
    { id: "3", value: "Mar" },
    { id: "4", value: "Apr" },
    { id: "5", value: "May" },
    { id: "6", value: "Jun" },
  ];

  const monthsSecondArr = [
    { id: "7", value: "Jul" },
    { id: "8", value: "Aug" },
    { id: "9", value: "Sep" },
    { id: "10", value: "Oct" },
    { id: "11", value: "Nov" },
    { id: "12", value: "Dec" },
  ];

  const yearsArr = [{ id: "2022" }, { id: "2023" }];

  //Set options for chart
  useMemo(() => {
    setChartOptions({
      time: {
        useUTC: false,
        timezone: "Asia/Bangkok",
      },
      xAxis: {
        type: "datetime",
        crosshair: {
          //Dots on line
          color: "white",
          dashStyle: "Dash",
        },
        labels: {
          style: {
            color: "white",
            fontFamily: "system-ui",
          },
          format: "{value:%b-%d}",
        },
        lineColor: "#27ca7ee1",
        tickColor: "#20a86991",
        ordinal: false,
        minRange: 1,
      },
      yAxis: {
        title: {
          text: "",
        },
        opposite: false,
        labels: {
          style: {
            color: "white",
          },
        },
        gridLineDashStyle: "Dash",
        gridLineColor: "white",
        gridLineWidth: 0.5,
        // min: yAxisMin,
      },
      title: {
        style: {
          color: "white",
        },
        //text: yearTabValue,
      },
      series: [
        {
          type: "areaspline",
          lineWidth: 3,
          lineColor: "#20a86991",
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "rgba(38, 201, 125, 0.2)"],
              [1, "rgba(38, 201, 125, 0.01)"],
            ],
          },
          marker: {
            fillColor: "#27ca7ee1",
            lineWidth: 2,
            radius: 4,
            lineColor: "#27ca7ee1",
          },
          animation: {
            duration: 500,
          },
        },
      ],
      chart: {
        backgroundColor: "transparent",
        reflow: false,
      },
      legend: {
        itemStyle: {
          color: "white",
        },
      },
      navigation: {
        enabled: true,
        buttonOptions: {
          enabled: true,
        },
      },
      rangeSelector: { enabled: false },
      credits: { enabled: false },
      tooltip: {
        animation: true,
        // xDateFormat: "",
        style: { fontSize: "0.9rem" },
        useHTML: true,
        backgroundColor: "rgba(255, 255, 255)",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#B0C4DB",
        shadow: {
          offsetX: 1,
          offsetY: 2,
          width: 2,
          opacity: 0.05,
        },
        shape: "square",
        // split: true,
        hideDelay: 100,
        outside: false,
      },
      navigator: {
        handles: {
          // lineWidth: 1,
          width: 20,
          height: 30,
        },
        maskFill: "rgba(78, 125, 217, 0.2)",
        outlineWidth: 0,
        enabled: false,
        xAxis: {},
      },
      scrollbar: {
        enabled: false,
      },
    });

    async function getStoreProfit() {
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
      } else {
        console.log(error);
      }
    }
    getStoreProfit();
  }, []);

  //Get new / unseen orders
  useEffect(() => {
    async function getUnseenOrders() {
      savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
      if (savedCookie !== null && savedCookie !== undefined) {
        const data = {
          store_id: savedCookie.storeId,
        };
        const [response, err] = await getUnseenOrderFromStore(data);
        if (response) {
          setUnseenOrdersData(response);
        } else {
          console.log(err);
        }
      }
    }

    getUnseenOrders();
  }, []);

  //Switch to upper or lower month index in table upon clicking
  useMemo(() => {
    if (monthTabValue != "" && monthTabValue != undefined) {
      var monthIndexNumb;
      var monthNumb;

      if (isMonthsChange) {
        monthIndexNumb = monthsFirstArr.findIndex(
          (month) => month.value === monthTabValue,
        );
        monthNumb = Number(monthIndexNumb);

        if (monthsSecondArr[monthNumb]) {
          setMonthTabValue(monthsSecondArr[monthNumb].value);
        }
      } else {
        monthIndexNumb = monthsSecondArr.findIndex(
          (month) => month.value === monthTabValue,
        );
        monthNumb = Number(monthIndexNumb);

        if (monthsFirstArr[monthNumb]) {
          setMonthTabValue(monthsFirstArr[monthNumb].value);
        }
      }
    }
  }, [isMonthsChange]);

  //Filter data upon choosing
  useEffect(() => {
    if (monthTabValue != "") {
      const cachedProfitData = localStorage.getItem(yearTabValue + "_profit");
      var filteredData = JSON.parse(cachedProfitData);

      if (filteredData?.[monthTabValue]) {
        setProfitData(filteredData[monthTabValue]);
      } else {
        setProfitData([]);
      }
    }
  }, [monthTabValue, yearTabValue]);

  //API called to get data
  useEffect(() => {
    async function getProfitData() {
      savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
      const data = {
        store_id: savedCookie.storeId,
        year: yearTabValue,
      };
      const [response, err] = await getStoreProfit(data);
      if (response) {
        localStorage.setItem(
          yearTabValue + "_profit",
          JSON.stringify(response),
        );
      } else {
        //console.log(err);
      }
    }
  }, [yearTabValue]);

  //Build chart with data
  useEffect(() => {
    setChartOptions({
      title: {
        text: profitData.length > 0 ? yearTabValue + " Profit" : "",
      },
      series: {
        name: profitData.length > 0 ? "USD" : "",
        data: profitData,
      },
      legend: {
        enabled: profitData.length > 0 ? true : false,
      },
    });
  }, [profitData, yearTabValue]);

  //Button delay
  useMemo(() => {
    SetButtonLoading(true);
    setTimeout(() => {
      SetButtonLoading(false);
    }, 500);
  }, [isMonthsChange]);

  return (
    <>
      <Stack>
        <Group
          position="apart"
          //ml={10}
          mt={10}
          spacing={0}
          style={{
            background: "#25262b",
            borderRadius: "5px",
          }}
        >
          <Group position="left" spacing={0} ml={20} mt={10} mb={10}>
            <ActionIcon color="teal" variant="filled" size="2.25rem">
              <FaRegCalendarAlt size={18} />
            </ActionIcon>
            <Tabs
              ml={20}
              variant="pills"
              color="teal"
              //defaultValue={yearsArr[0].id}
              value={yearTabValue}
              onTabChange={(value) => setYearTabValue(value)}
              style={{
                border: "2px solid #20a86991",
                borderRadius: "5px",
              }}
            >
              <Tabs.List>
                {yearsArr.map((item) => (
                  <Tabs.Tab key={item.id} value={item.id}>
                    {item.id}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>

            <Group
              spacing={0}
              style={{
                transition: "0.25s all ease-in-out",
                transform:
                  yearTabValue != ""
                    ? "translate3d(10px, 0, 0)"
                    : "translate3d(0, 0, 0)",
                opacity: yearTabValue != "" ? 1 : 0,
              }}
            >
              <div
                style={{
                  width: "1.625rem",
                  border: "1px solid #1971c2",
                  borderRadius: "5px",
                }}
              ></div>
              <Tabs
                variant="pills"
                color="teal"
                //defaultValue={monthsFirstArr[0].id}
                value={monthTabValue}
                onTabChange={(value) => setMonthTabValue(value)}
                m={10}
                style={{
                  width: "21.625rem",
                  height: "2.375rem",
                  border: "2px solid #20a86991",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <Tabs.List
                  style={{
                    transition: "transform 0.5s ease",
                    transform: !isMonthsChange
                      ? "translateY(0%)"
                      : "translateY(-54%)",
                  }}
                >
                  {monthsFirstArr.map((item) => (
                    <Tabs.Tab
                      key={item.id}
                      value={item.value}
                      style={{
                        width: "3.25rem",
                      }}
                    >
                      {item.value}
                    </Tabs.Tab>
                  ))}
                  {monthsSecondArr.map((item) => (
                    <Tabs.Tab
                      key={item.id}
                      value={item.value}
                      style={{
                        width: "3.25rem",
                      }}
                    >
                      {item.value}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>

              <Button
                leftIcon={
                  !isMonthsChange ? (
                    <BsFillArrowDownCircleFill size={15} />
                  ) : (
                    <BsFillArrowUpCircleFill size={15} />
                  )
                }
                loading={buttonLoading}
                onClick={() => setIsMonthsChange(!isMonthsChange)}
              >
                {!isMonthsChange ? "Next" : "Back"}
              </Button>
            </Group>
          </Group>
          <Group mr={20}>
            <ActionIcon
              color="blue"
              variant="filled"
              size="2.25rem"
              style={{ cursor: "default" }}
            >
              <BsClock size={18} />
            </ActionIcon>
            <RealtimeClock />
          </Group>
        </Group>
        <Group w={"100%"} position="apart" spacing={0}>
          <Stack
            pt={10}
            spacing={5}
            style={{
              background: "#25262b",
              borderRadius: "5px",
              width: "68.5%",
            }}
          >
            <div
              style={{
                width: "100%",
                position: "relative",
                opacity: profitData.length > 0 ? 0 : 1,
              }}
            >
              <Stack
                align="center"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, 120%)",
                }}
              >
                <BsDatabaseFillX size={"4.625rem"} />
                <Text size={18}>No data found</Text>
              </Stack>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              constructorType="chart"
              ref={chartRef}
            />
          </Stack>
          {/* Split right - below */}
          <Stack
            spacing={10}
            style={{
              height: "25.938rem",
              maxHeight: "25.938rem",
              width: "30.5%",
            }}
          >
            <Group w={"100%"} h={"7.938rem"} spacing={10} position="apart">
              <Group
                w={"37%"}
                h={"100%"}
                style={{
                  padding: "0.625rem 0.625rem 0 0.625rem",
                  background: "#25262b",
                  borderRadius: "5px",
                }}
              >
                <Stack w={"100%"} position="apart" spacing={10}>
                  <Group spacing={10}>
                    <ThemeIcon size="1.6rem" color="blue">
                      <AiFillEye size="1.2rem" />
                    </ThemeIcon>

                    <Text className={styles.labelFont}>New &nbsp;</Text>
                  </Group>
                  <Group spacing={5} position="right">
                    {unseenOrdersData.length > 0 ? (
                      <HiOutlineArrowNarrowUp color="white" size="1.5rem" />
                    ) : (
                      <></>
                    )}
                    <Text className={styles.valueFont}>
                      {unseenOrdersData.length > 0
                        ? unseenOrdersData.length
                        : 0}
                    </Text>
                  </Group>
                </Stack>
              </Group>
              <Group
                w={"60%"}
                h={"100%"}
                style={{
                  padding: "0.625rem 0.625rem 0 0.625rem",
                  background: "#25262b",
                  borderRadius: "5px",
                }}
              >
                <Stack w={"100%"} position="apart" spacing={10}>
                  <Group spacing={10}>
                    <ThemeIcon size="1.6rem" color="blue">
                      <MdAccountBalanceWallet size="1.2rem" />
                    </ThemeIcon>

                    <Text className={styles.labelFont}>Balance &nbsp;</Text>
                  </Group>
                  <Group position="right">
                    <Text className={styles.valueFont}>
                      {Object.keys(totalProfit).length > 0
                        ? "$ " + totalProfit["SUC"].tamount
                        : 0}
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Group>
            <Group
              style={{
                background: "#25262b",
                borderRadius: "5px",
                height: "8.938rem",
              }}
            >
              <Text>Test</Text>
            </Group>
            <Group
              position="center"
              style={{
                background: "#25262b",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              <Stack
                spacing={0}
                w={"100%"}
                style={{
                  padding: "0.625rem 0.625rem 0 0.625rem",
                }}
              >
                <Group spacing={10}>
                  <ThemeIcon size="1.6rem" color="blue">
                    <RiInformationFill size="1.2rem" />
                  </ThemeIcon>
                  <Text className={styles.labelFont}>Orders Status</Text>
                </Group>
                {Object.keys(totalProfit).length > 0 ? (
                  <Group position="center" pr={5}>
                    <RingProgress
                      size={165}
                      thickness={16}
                      label={
                        <Text
                          size={20}
                          align="center"
                          px="xs"
                          sx={{ pointerEvents: "none" }}
                        >
                          {totalProfitPercentage}
                        </Text>
                      }
                      rootColor="grey"
                      sections={[
                        {
                          value: (
                            (totalProfit["SUC"].tquantity /
                              totalProfitPercentage) *
                            100
                          ).toFixed(0),
                          color: "teal",
                          tooltip: "Success",
                        },
                        {
                          value: (
                            (totalProfit["NRY"].tquantity /
                              totalProfitPercentage) *
                            100
                          ).toFixed(0),
                          color: "red",
                          tooltip: "Not received yet",
                        },
                        {
                          value: (
                            (totalProfit["SHP"].tquantity /
                              totalProfitPercentage) *
                            100
                          ).toFixed(0),
                          color: "grape",
                          tooltip: "Shipping",
                        },
                      ]}
                    />
                    <Stack>
                      <Group position="apart" className={styles.redBorder}>
                        <ThemeIcon
                          className={styles.redPieChartSerie}
                          radius={30}
                          size="2.3rem"
                        >
                          <LuPackageMinus color="#ffffff94" size="1.5rem" />
                        </ThemeIcon>
                        <Text className={styles.piechartSeriesFont}>
                          {totalProfit["NRY"].tquantity}
                        </Text>
                      </Group>
                      <Group position="apart" className={styles.greenBorder}>
                        <ThemeIcon
                          className={styles.greenPieChartSerie}
                          radius={30}
                          size="2.3rem"
                        >
                          <LuPackageCheck color="#ffffff94" size="1.5rem" />
                        </ThemeIcon>
                        <Text className={styles.piechartSeriesFont}>
                          {totalProfit["SUC"].tquantity}
                        </Text>
                      </Group>
                      <Group position="apart" className={styles.purpleBorder}>
                        <ThemeIcon
                          className={styles.purplePieChartSerie}
                          radius={30}
                          size="2.3rem"
                        >
                          <TbPackageExport color="#ffffff94" size="1.5rem" />
                        </ThemeIcon>
                        <Text className={styles.piechartSeriesFont}>
                          {totalProfit["SHP"].tquantity}
                        </Text>
                      </Group>
                    </Stack>
                  </Group>
                ) : (
                  <></>
                )}
              </Stack>
            </Group>
          </Stack>
        </Group>
      </Stack>
    </>
  );
};

export default Highchart;
