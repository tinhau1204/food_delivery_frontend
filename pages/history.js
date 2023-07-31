import {
  createStyles,
  Table,
  Anchor,
  Text,
  Group,
  Radio,
  Stack,
  Paper,
  Skeleton,
  Button,
  Modal,
  useMantineTheme,
  Tooltip,
  //SimpleGrid,
} from "@mantine/core";
import Image from "next/image";
import arrowleft from "../public/arrowleft.svg";
import arrowright from "../public/arrowright.svg";
import { useEffect, useState } from "react";
//import axios from "axios";
import Link from "next/link";
//import { useSelector } from "react-redux";
//import { getUser } from "@/redux/user";
import {
  IconPackgeExport,
  IconTruckDelivery,
  IconCircleX,
  IconChecks,
  IconSquareRoundedLetterX,
  IconHourglassEmpty,
} from "@tabler/icons";
import moment from "moment";
import { getHistory } from "@/lib/api/orders";
import { getOrderById } from "@/lib/api/orders";
import { getOrderComment } from "@/lib/api/orders";
import { getOrderReceivedState } from "@/lib/api/orders";
import { cancelOrder } from "@/lib/api/products";
import { BiCommentDetail } from "react-icons/bi";
import WriteReview from "@/components/DetailPage/ReviewDetail/WriteReview";

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
    background: "#27ca7e91",
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
    height: "100%",
    width: "98vw",
  },
  table: {
    width: "100vw",
  },
}));

export default function Orders() {
  let userId = "",
    cookieInfo = "";
  if (document.cookie.indexOf("Cus") > -1) {
    cookieInfo = JSON.parse(document.cookie.split("Cus=")[1]);
    userId = cookieInfo.userId;
  }
  const { classes } = useStyles();
  const [orders, setOrders] = useState([]);
  const [orderState, setOrderState] = useState([]);
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
  const [openedState, setOpenedState] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openedOrder, setOpenedOrder] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [price, setPrice] = useState("");
  const [ship, setShip] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  // const [userId, setUserId] = useState("");
  const [detail, setDetail] = useState([]);
  const [orderComment, setOrderComment] = useState([]);
  const theme = useMantineTheme();
  const [commentopened, setCommentOpened] = useState(false);
  const [commentStoreId, setCommentStoreId] = useState("");
  const [change, setChange] = useState(false);

  async function getAllOrders(status) {
    let status_id;
    switch (status) {
      case "not received":
        status_id = "PENDING";
        break;
      case "received":
        status_id = "CONFIRMED";
        break;
      case "shipping":
        status_id = "SHIPPING";
        break;
      case "success":
        status_id = "SUCCESS";
        break;
      case "failed":
        status_id = "FAILED";
        break;
    }

    try {
      let session = "";
      if (document.cookie.indexOf("Cus") > -1) {
        session = JSON.parse(document.cookie.split("Cus=")[1]);
      }
      let account_id = session.userId;
      const [data, error] = await getHistory(
        account_id,
        status_id,
        currentPage,
        size,
      );
      setTotalOrders(data.total);
      setTotalPages(data.pages);
      setHasNext(data.hasNext);
      setHasPrevious(data.hasPrevious);
      setOrders(data.items);
    } catch (err) {
      console.log(err);
    }
    //setIsFinish(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsFinish(true);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  async function getOrder(order_id) {
    try {
      const [data, error] = await getOrderById(order_id);
      setAddress(data.address);
      setPayment(data.payment_method);
      setShip(data.ship_fee);
      setCreatedDate(data.created_date);
      setDetail(data.order_detail);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOrderState(order_id) {
    try {
      const value = {
        order_id: order_id,
      };
      const [data, error] = await getOrderReceivedState(value);
      if (data) {
        console.log(data);
        setOrderState(data);
        setOpenedState(true);
      } else {
        setOpenedState(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getComment(order_id) {
    try {
      const value = { account_id: userId, order_id: order_id };
      const [data] = await getOrderComment(value);
      setOrderComment(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllOrders(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function cancelingOrder(order_id) {
    setLoading(true);

    const status_id = "FAILED";

    try {
      const dataCancel = {
        account_id: userId,
        order_id: order_id,
        status_id: status_id,
      };

      const [data, error] = await cancelOrder(dataCancel);
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
    let Icon = IconPackgeExport;
    switch (tab) {
      case "not received":
        Icon = IconCircleX;
        break;
      case "received":
        Icon = IconPackgeExport;
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
          <td style={{ verticalAlign: "middle" }}>
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
          <td style={{ verticalAlign: "middle" }}>
            {Intl.NumberFormat().format(Number(row.totalprice))}
          </td>
          <td style={{ verticalAlign: "middle" }}>
            {moment(row.created_date).format("MM/DD/YYYY h:mm a")}{" "}
            <Text c="dimmed">({moment(row.created_date).fromNow()})</Text>
          </td>
          <td style={{ verticalAlign: "middle" }}>{row.payment_method}</td>
          <td style={{ verticalAlign: "middle" }}>
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
            ) : tab == "success" ? (
              <>
                <Button
                  onClick={async () => {
                    await getComment(row.id);
                    setCommentOpened(true);
                  }}
                  variant="outline"
                  color="teal"
                  leftIcon={<BiCommentDetail size={20} />}
                >
                  Add Comment
                </Button>
                <Modal
                  opened={commentopened}
                  onClose={() => setCommentOpened(false)}
                  size={700}
                >
                  {orderComment.length > 0 ? (
                    <WriteReview orderId={row.id} orderComment={orderComment} />
                  ) : (
                    <></>
                  )}
                </Modal>
              </>
            ) : tab == "received" ? (
              <>
                <Tooltip label={"Waiting for all store to accept "}>
                  <Button
                    variant="outline"
                    color="white"
                    onClick={() => {
                      getOrderState(row.id);
                    }}
                  >
                    <Icon size={22} stroke={1.5} />
                  </Button>
                </Tooltip>
              </>
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
            setOrders([]);
            setIsFinish(false);
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
            setOrders([]);
            setIsFinish(false);
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
            setOrders([]);
            setIsFinish(false);
          }}
        >
          Shipping
        </Button>
        <Button
          size="sm"
          color="green"
          variant={tab == "success" ? "filled" : "default"}
          radius="md"
          className={classes.tab}
          onClick={() => {
            setTab("success");
            setOrders([]);
            setIsFinish(false);
          }}
        >
          Success
        </Button>
        <Button
          size="sm"
          color="red"
          variant={tab == "failed" ? "filled" : "default"}
          radius="md"
          className={classes.tab}
          onClick={() => {
            setTab("failed");
            setOrders([]);
            setIsFinish(false);
          }}
        >
          Failed
        </Button>
      </Group>
      <Group position="center">
        <div className={classes.table}>
          <Paper p="md" radius="md" shadow="0 0 35px rgb(127 150 174 / 15%);">
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
                          priority
                          loader={({ src }) => src}
                          src={arrowleft}
                          width={10}
                          height={10}
                          alt={""}
                        />
                      </Button>
                    </li>
                    <li>
                      <Paper
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
                          priority
                          loader={({ src }) => src}
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
            <Paper>
              <Table sx={{ minWidth: 800 }} verticalSpacing={10}>
                <thead className={classes.thead}>
                  <tr>
                    <th>ID</th>
                    <th>Total(USD)</th>
                    <th>Timestamp</th>
                    <th>Payment method</th>
                    <th>
                      {tab == "not received"
                        ? "Action"
                        : tab == "received"
                        ? "Current State"
                        : ""}
                    </th>
                  </tr>
                </thead>
                <tbody>{isFinish ? rows : <Waiting />} </tbody>
              </Table>
              {isFinish && orders.length == 0 ? (
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
                          priority
                          loader={({ src }) => src}
                          src={arrowleft}
                          width={10}
                          height={10}
                          alt={""}
                        />
                      </Button>
                    </li>
                    <li>
                      <Paper
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
                          priority
                          loader={({ src }) => src}
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
            gradient={{ from: "#13a762", to: "#27ca7d", deg: 45 }}
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
            size="lg"
            variant="gradient"
            loading={loading}
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            onClick={() => cancelingOrder(orderId)}
          >
            OK
          </Button>
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: "grey", to: "white", deg: 60 }}
            loading={loading}
            style={{ color: "black" }}
            ml={10}
            onClick={() => setOpened(false)}
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
              gradient={{ from: "#13a762", to: "#27ca7d", deg: 45 }}
              size="xl"
              weight={700}
              style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >
              Order Bill
            </Text>
          </Paper>
        </Group>
        <Group position="left" ml={10} mt={20}>
          <Paper>
            <Group>
              <Text weight={700} color="white">
                Id:{" "}
              </Text>
              <Text color="white">{orderId}</Text>
            </Group>
            <Group mt={10} mb={10}>
              <Text weight={700} color="white">
                Address:{" "}
              </Text>
              <Text color="white">{address}</Text>
            </Group>
            <Group mt={10} mb={10}>
              <Text weight={700} color="white">
                Ship fee:{" "}
              </Text>
              <Text>${" " + ship}</Text>
            </Group>
            <Group mt={10} mb={20}>
              <Text weight={700} color="white">
                Detail:
              </Text>
            </Group>
            <Group>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 5,
                }}
              >
                <Table horizontalSpacing="sm" verticalSpacing="xs">
                  <thead>
                    <tr>
                      <th>Product name</th>
                      <th>Store</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.map((item) => (
                      <tr key={item.product_id}>
                        <td>
                          <Link href={"/detail?id=" + item.product_id}>
                            <Text
                              color={"#27ca7d"}
                              style={{
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {item.product_name}
                            </Text>
                          </Link>
                        </td>
                        <td>
                          <Link href={"/store/detail?id=" + item.store_id}>
                            <Text
                              style={{
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              color={"#e99424"}
                            >
                              {item.store_name}
                            </Text>
                          </Link>
                        </td>
                        <td>
                          <Text color={"#27ca7d"}>{item.quantity}</Text>{" "}
                        </td>
                        <td>
                          <Text color={"#253d4e"}>{item.price + "$"} </Text>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Group>
          </Paper>
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
        opened={openedState}
        onClose={() => setOpenedState(false)}
      >
        <Group position="center">
          <Paper>
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: "#13a762", to: "#27ca7d", deg: 45 }}
              size="xl"
              weight={700}
              style={{ fontFamily: "Greycliff CF, sans-serif" }}
            >
              Order State
            </Text>
          </Paper>
        </Group>
        <Group position="left" ml={10} mt={20}>
          <Paper>
            <Group>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 5,
                }}
              >
                <Table horizontalSpacing="sm" verticalSpacing="xs">
                  <thead>
                    <tr>
                      <th>Product name</th>
                      <th>Store</th>
                      <th>Accept</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderState.map((item) => (
                      <tr key={item.name}>
                        <td>
                          <Text
                            color={"#27ca7d"}
                            style={{
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {item.name}
                          </Text>
                        </td>
                        <td>
                          <Text
                            style={{
                              cursor: "pointer",
                              "&:hover": { textDecoration: "underline" },
                            }}
                            color={"#e99424"}
                          >
                            {item.store}
                          </Text>
                        </td>
                        <td>
                          {item.proceed == 1 ? (
                            <IconChecks
                              size={22}
                              stroke={1.5}
                              align="center"
                              verticalAlign="center"
                            />
                          ) : (
                            <IconHourglassEmpty size={22} stroke={1.5} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Group>
          </Paper>
        </Group>
      </Modal>
    </div>
  );
}
