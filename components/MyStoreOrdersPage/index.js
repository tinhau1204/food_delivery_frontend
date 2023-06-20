import {
  createStyles,
  Table,
  //Progress,
  Anchor,
  Text,
  Group,
  //ScrollArea,
  Paper,
  Skeleton,
  Button,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import arrowleft from "../../public/arrowleft.svg";
import arrowright from "../../public/arrowright.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  IconCheck,
  IconTruckDelivery,
  IconBrowserCheck,
  IconCircleCheck,
} from "@tabler/icons";
import moment from "moment";
import { getAllOrdersWithParams } from "@/lib";

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
  },
  enableButtom: {
    color: "#0097FF",
  },
  tab: {
    width: 155,
  },
  root: {
    marginLeft: "270px",
    marginTop: 20,
    height: "100%",
  },
  tdcontent: {
    textAlign: "center",
    verticalAlign: "middle",
  },
}));

export default function MyStoreOrdersPage() {
  const { classes } = useStyles();
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("not received");
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isProceed, setIsProceed] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState(0);
  const theme = useMantineTheme();
  const savedCookie = JSON.parse(document.cookie.split("Sel=")[1]);
  const store_id = savedCookie.storeId;
  const user_id = savedCookie.userId;

  async function getAllOrders() {
    try {
      const [response, err] = await getAllOrdersWithParams(
        store_id,
        currentPage,
        size,
      );
      setTotalOrders(response.items.length);
      setTotalPages(response.pages);
      setHasNext(response.hasNext);
      setHasPrevious(response.hasPrevious);
      setOrders(response.items);
      setIsProceed(false);
    } catch (err) {
      console.log(err);
    }
    setIsFinish(true);
  }

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function ProceedOrder(order_id, product_id) {
    setLoading(true);
    const data = {
      order_id: order_id,
      product_id: product_id,
      store_id: store_id,
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API + "/order/proceed",
        data,
      );
      if (response.data.error) {
        alert(response.data.error);
        setOpened(false);
        setLoading(false);
      } else {
        //alert(response.data.message);
        setIsProceed(true);
        setOpened(false);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const rows = orders.map((row) => {
    let Icon = IconCircleCheck;

    return (
      <tr key={row.id}>
        <td className={classes.tdcontent}>
          <Text color={"#61afef"}>{row.id}</Text>
        </td>
        <td className={classes.tdcontent}>{row.email}</td>
        <td className={classes.tdcontent}>{row.product}</td>
        <td className={classes.tdcontent}>
          {moment(row.created_date).format("MM/DD/YYYY h:mm a")}
          <Text size={12} c="dimmed">
            ({moment(row.created_date).fromNow()})
          </Text>
        </td>
        <td className={classes.tdcontent}>{row.payment_method}</td>
        <td className={classes.tdcontent}>
          {row.status != "failed" ? row.proceed : "Cancelled"}
        </td>
        <td className={classes.tdcontent}>
          {row.status != "failed" && row.proceed === 0 && (
            <Button
              variant="default"
              onClick={() => {
                setOrderId(row.id);
                setProductId(row.product_id);
                setOpened(true);
              }}
            >
              <Icon size={20} stroke={1.5} />
            </Button>
          )}
        </td>
      </tr>
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
      <Group position="center" w="max-content">
        <Paper withBorder p="md" radius="md" w="82vw">
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
                      First
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
                        loading="lazy"
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
                        loading="lazy"
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
                  <th style={{ width: "15%" }}>ID</th>
                  <th>Users&apos; Email</th>
                  <th style={{ width: "20%" }}>Product</th>
                  <th>Timestamp</th>
                  <th style={{ width: "15%" }}>Payment method</th>
                  <th style={{ width: "10%" }}>Proceed</th>
                  <th stlye={{ width: "5%" }}>Action</th>
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
                      First
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
                        loading="lazy"
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
                        loading="lazy"
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
            {tab == "not received"
              ? "RECEIVE ORDER"
              : tab == "received"
              ? "CONFIRM ORDER FOR SHIPPING"
              : tab == "shipping"
              ? "CONFIRM SHIPPING"
              : ""}
          </Text>
        </Group>
        <Group position="center" mb={20}>
          <Text
            component="span"
            align="center"
            weight={500}
            style={{ fontFamily: "Greycliff CF, sans-serif" }}
          >
            {tab == "not received"
              ? "Are you sure to proceed this order's product?"
              : tab == "received"
              ? "Are you sure to delivery this order?"
              : tab == "shipping"
              ? "Are you sure want to confirm that this order is delivered successfully?"
              : ""}
          </Text>
        </Group>
        <Group position="center" mb={10}>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            fullWidth
            loading={loading}
            onClick={() => ProceedOrder(orderId, productId)}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
