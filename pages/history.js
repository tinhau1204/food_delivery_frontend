import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Paper,
  Skeleton,
  Button,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import arrowleft from "../public/arrowleft.svg";
import arrowright from "../public/arrowright.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/user";
import {
  IconCheck,
  IconTruckDelivery,
  IconCircleX,
  IconChecks,
  IconSquareRoundedLetterX,
} from "@tabler/icons";
import moment from "moment";
import { getHistory } from "@/lib/api/order";
import { getProductDetail } from "@/lib/api/productdetail";
import { cancelOrder } from "@/lib/api/products";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
  pagination: {
    padding: 10,
    borderBottom: "1px solid #CACACA",
    marginBottom: 30,
  },
  paginationBottom: {
    padding: 10,
    borderTop: "1px solid #CACACA",
    marginTop: 30,
  },
  totalText: {
    color: "#898989",
  },
  thead: {
    background: "#D1D1D1",
  },
  paginationText: {
    display: "flex",
    padding: 5,
    fontSize: 13,
  },
  enableButtom: {
    color: "#0097FF",
  },
  tab: {
    width: 155,
  },
  root: {
    padding: 40,
    backgroundColor: "#FAFAFA",
    height: "100%",
    width: "98vw",
  },
  table: {
    width: "100vw",
  },
}));

export default function Orders() {
  const { classes } = useStyles();
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("not received");
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [openedOrder, setOpenedOrder] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [price, setPrice] = useState("");
  const [ship, setShip] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [detail, setDetail] = useState([]);
  const theme = useMantineTheme();
  const user = useSelector(getUser);
  const user_id = user.userId;

  async function getAllOrders(status) {
    let status_id;
    switch (status) {
      case "not received":
        status_id = "NRY";
        break;
      case "received":
        status_id = "RCD";
        break;
      case "shipping":
        status_id = "SHP";
        break;
      case "success":
        status_id = "SUC";
        break;
      case "failed":
        status_id = "FAL";
        break;
    }

    try {
      const [data, error] = await getHistory(
        `/order/get-history?user_id=${user_id}&status_id=${status_id}&page=${currentPage}&size=${size}`,
      );
      setTotalOrders(data.total);
      setTotalPages(data.pages);
      setHasNext(data.hasNext);
      setHasPrevious(data.hasPrevious);
      setOrders(data.items);
    } catch (err) {
      console.log(err);
    }
    setIsFinish(true);
  }

  async function getOrder(order_id) {
    try {
      const [data, error] = await getProductDetail(
        "order/get-order/" + order_id,
      );
      console.log(data);

      setAddress(data.address);
      setPayment(data.payment_method);
      setPrice(data.price);
      setShip(data.ship_fee);
      setTimestamp(data.timestamp);
      setDetail(data.order_detail);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllOrders(tab);
  }, [tab]);

  async function cancelingOrder(order_id) {
    setLoading(true);

    const status_id = "FAL";

    try {
      const dataCancel = {
        account_id: user_id,
        order_id: order_id,
        status_id: status_id,
      };

      const [data, error] = await cancelOrder(
        "order/status-change",
        dataCancel,
      );
      if (error) {
        alert(error);
        setLoading(false);
      } else {
        alert(data.message);
        setOpened(false);
        setLoading(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const rows = orders.map((row) => {
    //const latestDate = new Date(Number(row.last_date));
    let Icon = IconCheck;
    switch (tab) {
      case "not received":
        Icon = IconCircleX;
        break;
      case "received":
        Icon = IconCheck;
        break;
      case "shipping":
        Icon = IconTruckDelivery;
        break;
      case "success":
        Icon = IconChecks;
        break;
      case "failed":
        Icon = IconSquareRoundedLetterX;
        break;
    }
    return (
      <>
        <tr key={row.id}>
          <td>
            <Anchor
              size="sm"
              onClick={async () => {
                setOrderId(row.id);
                await getOrder(row.id);
                setOpenedOrder(true);
              }}
            >
              {row.id}
            </Anchor>
          </td>
          <td>{row.store}</td>
          <td>{Intl.NumberFormat().format(Number(row.price))}</td>
          <td>
            {moment(row.timestamp).format("MM/DD/YYYY h:mm a")}{" "}
            <Text c="dimmed">({moment(row.timestamp).fromNow()})</Text>
          </td>
          <td>{row.payment_method}</td>
          <td>
            {tab == "not received" ? (
              <Button
                variant="default"
                onClick={() => {
                  setOrderId(row.id);
                  setOpened(true);
                }}
              >
                <Icon size={30} stroke={1.5} />
              </Button>
            ) : (
              <Icon size={22} stroke={1.5} />
            )}
          </td>
        </tr>
      </>
    );
  });

  function Waiting() {
    return (
      <>
        <tr>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
          <td>
            <Skeleton height={8} mt={6} width="100%" radius="xl" />
          </td>
        </tr>
      </>
    );
  }
  return (
    <div className={classes.root}>
      <Group position="left" mb={10}>
        <Button
          size="sm"
          variant={tab == "not received" ? "filled" : "default"}
          radius="md"
          className={classes.tab}
          onClick={() => {
            setTab("not received");
          }}
        >
          Not Accepted Yet
        </Button>
        <Button
          size="sm"
          variant={tab == "received" ? "filled" : "default"}
          radius="md"
          className={classes.tab}
          onClick={() => {
            setTab("received");
          }}
        >
          Accepted
        </Button>
        <Button
          size="sm"
          variant={tab == "shipping" ? "filled" : "default"}
          radius="md"
          className={classes.tab}
          onClick={() => {
            setTab("shipping");
          }}
        >
          Shipping
        </Button>
        <Button
          size="sm"
          variant={tab == "success" ? "filled" : "default"}
          radius="md"
          className={classes.tab}
          onClick={() => {
            setTab("success");
          }}
        >
          Success
        </Button>
        <Button
          size="sm"
          variant={tab == "failed" ? "filled" : "default"}
          radius="md"
          className={classes.tab}
          onClick={() => {
            setTab("failed");
          }}
        >
          Failed
        </Button>
      </Group>
      <Group position="center">
        <div className={classes.table}>
          <Paper
            withBorder
            p="md"
            radius="md"
            shadow="0 0 35px rgb(127 150 174 / 15%);"
          >
            <Group position="apart" className={classes.pagination}>
              <span className={classes.totalText}>
                Total {totalOrders} orders
              </span>
              <Paper>
                <nav>
                  <ul>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : currentPage == 1}
                        className={classes.enableButtom}
                        radius={5}
                        mr={2}
                        size="xs"
                      >
                        first
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : !hasPrevious}
                        radius={5}
                        mr={2}
                        size="xs"
                      >
                        <Image
                          src={arrowleft}
                          width={10}
                          height={10}
                          alt={""}
                        />
                      </Button>
                    </li>
                    <li>
                      <Paper
                        withBorder
                        className={classes.paginationText}
                        fz="xs"
                        radius={5}
                        mr={2}
                      >
                        <span>
                          {" "}
                          Page <strong> 1 </strong>
                          of
                          <strong> {totalPages} </strong>
                        </span>
                      </Paper>
                    </li>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : !hasNext}
                        radius={5}
                        mr={2}
                        size="xs"
                      >
                        <Image
                          src={arrowright}
                          width={10}
                          height={10}
                          alt={""}
                        />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : currentPage == totalPages}
                        className={classes.enableButtom}
                        radius={5}
                        size="xs"
                      >
                        Last
                      </Button>
                    </li>
                  </ul>
                </nav>
              </Paper>
            </Group>
            <Paper withBorder>
              <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                <thead className={classes.thead}>
                  <tr>
                    <th>ID</th>
                    <th>Store</th>
                    <th>Total Price (USD)</th>
                    <th>Timestamp</th>
                    <th>Payment method</th>
                    <th>{tab == "not received" ? "Action" : ""}</th>
                  </tr>
                </thead>
                <tbody>{isFinish ? rows : <Waiting />}</tbody>
              </Table>
              {orders.length == 0 ? (
                <Group position="center">
                  <Text color="#B4B4B4" fw={500} mt={50} mb={50}>
                    Empty
                  </Text>
                </Group>
              ) : (
                <></>
              )}
            </Paper>
            <Group position="apart" className={classes.paginationBottom}>
              <span className={classes.totalText}>{size} orders per page</span>
              <Paper>
                <nav>
                  <ul>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : currentPage == 1}
                        className={classes.enableButtom}
                        radius={5}
                        mr={2}
                        size="xs"
                      >
                        first
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : !hasPrevious}
                        radius={5}
                        mr={2}
                        size="xs"
                      >
                        <Image
                          src={arrowleft}
                          width={10}
                          height={10}
                          alt={""}
                        />
                      </Button>
                    </li>
                    <li>
                      <Paper
                        withBorder
                        className={classes.paginationText}
                        fz="xs"
                        radius={5}
                        mr={2}
                      >
                        <span>
                          {" "}
                          Page <strong> 1 </strong>
                          of
                          <strong> {totalPages} </strong>
                        </span>
                      </Paper>
                    </li>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : !hasNext}
                        radius={5}
                        mr={2}
                        size="xs"
                      >
                        <Image
                          src={arrowright}
                          width={10}
                          height={10}
                          alt={""}
                        />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="default"
                        disabled={!isFinish ? true : currentPage == totalPages}
                        className={classes.enableButtom}
                        radius={5}
                        size="xs"
                      >
                        Last
                      </Button>
                    </li>
                  </ul>
                </nav>
              </Paper>
            </Group>
          </Paper>
        </div>
      </Group>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Group position="center" mb={20}>
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            Canceling Order
          </Text>
        </Group>
        <Group position="center" mb={20}>
          <Text
            component="span"
            align="center"
            weight={500}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            Are you sure want to cancel this order?
          </Text>
        </Group>
        <Group position="center" mb={10}>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            fullWidth
            loading={loading}
            onClick={() => cancelingOrder(orderId)}
          >
            Cancel
          </Button>
        </Group>
      </Modal>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="auto"
        opened={openedOrder}
        onClose={() => setOpenedOrder(false)}
      >
        <Group position="center">
          <Paper>
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              size="xl"
              weight={700}
              style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >
              Order Detail
            </Text>
          </Paper>
        </Group>
        <Group position="left" ml={10} mt={20}>
          <Paper>
            <Group>
              <Text fw={700}>Id: </Text>
              <Text>{orderId}</Text>
            </Group>
            <Group mt={10}>
              <Text fw={700}>Address: </Text>
              <Text>{address}</Text>
            </Group>
            <Group mt={10}>
              <Text fw={700}>Order detail: </Text>
              {detail.map((item) => {
                return (
                  <Paper key={item.product_id}>
                    <Paper>
                      <Group>
                        <Text fw={700}>product: </Text>
                        <Text>{item.product}</Text>
                      </Group>
                      <Group>
                        <Text fw={700}>quantity: </Text>
                        <Text>{item.quantity}</Text>
                      </Group>
                    </Paper>
                  </Paper>
                );
              })}
            </Group>
            <Group mt={10}>
              <Text fw={700}>Payment method: </Text>
              <Text>{payment}</Text>
            </Group>
            <Group mt={10}>
              <Text fw={700}>Total Price: </Text>
              <Text>${price}</Text>
            </Group>
            <Group mt={10}>
              <Text fw={700}>Ship fee: </Text>
              <Text>${ship}</Text>
            </Group>
          </Paper>
        </Group>
      </Modal>
    </div>
  );
}