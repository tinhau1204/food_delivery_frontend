import { Button, Divider, Group, Paper, Text } from "@mantine/core";
//import Link from "next/link";
import { React, useEffect, useState } from "react";
import {
  //AiOutlineHeart,
  AiOutlineShoppingCart,
  //AiOutlineUser,
} from "react-icons/ai";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { createOrder } from "@/lib/api/order";
import { TiTick } from "react-icons/ti";
import { showNotification } from "@mantine/notifications";
import { getCart, clearCart } from "@/redux/cart";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
//import moment from "moment";

function genRandomString() {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let charLength = chars.length;
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

//Paypal button
const ButtonWrapper = ({ cartdata, amount, currency, showSpinner }) => {
  const router = useRouter();
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [accountId, setAccountid] = useState("");
  const style = { layout: "vertical" };

  //Cart
  const { cart } = useSelector(getCart);
  const cartDispatch = useDispatch();

  const clearCartList = () => {
    cartDispatch(clearCart());
  };
  ///

  const createOrderWithPaypal = async (values) => {
    const [data, error] = await createOrder("/order/create", values);
    if (data) {
      console.log("Order created");
    }
  };

  useEffect(() => {
    const data = JSON.parse(document.cookie.split("=")[1]);
    setAccountid(data.userId);

    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const generateOrderInfo = (account_id, cart, amount, address) => {
    let formatData = [];

    const randomid = genRandomString();

    let order_info = {
      order_id: randomid,
      account_id: account_id,
      ship_fee: "0",
      payment_method: "Paypal",
      address: address,
      order_detail: "",
      product_count: parseInt(cart.length),
      timestamp: new Date().toISOString(),
    };

    cart.forEach((Value) => {
      let returnJson = {
        product_id: Value.pid,
        store_id: Value.sid,
        price: Value.price,
        quantity: Value.amount,
      };

      formatData.push(returnJson);
    });
    console.log(formatData);
    order_info["order_detail"] = formatData;

    return order_info;
  };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            clearCartList();
            const address = details.purchase_units[0].shipping.address;
            const full_address =
              address.address_line_1 +
              address.admin_area_1 +
              address.admin_area_2;
            if (data) {
              let asd = generateOrderInfo(
                accountId,
                cartdata,
                amount,
                full_address,
              );
              console.log("Info:", asd);
              console.log("Done");
              createOrderWithPaypal(asd);
              showNotification({
                title: "Order success",
                message: "Thanks for your purchase",
                color: "green",
                icon: <TiTick color="white" />,
              });
              router.push("/paymentsuccess");
            }
          });
        }}
      />
    </>
  );
};

function CardTotal({
  subTotal,
  discount,
  shipping,
  tax,
  total,
  cartlist,
  onClick,
}) {
  const CLIENT_ID =
    "ATLuxXz6BMwtkXqYwxQCWv-FHEx3EigLmvQhfAOyhJZqtHDiys5hj5OW8IAKuK3B8yzcFg2vNB0MleMA";

  return (
    <>
      <Paper p="md" withBorder style={{ marginTop: 20, width: 300, zIndex: 1 }}>
        <Group position="apart">
          <Text size="lg" weight={700} color="#253d4e">
            Subtotal:{" "}
          </Text>
          <Text color="#253d4e">{"$" + (subTotal ?? 0)}</Text>
        </Group>
        <Divider my="sm" variant="dashed" />
        <Group position="apart">
          <Text size="lg" weight={700} color="#253d4e">
            Discount:{" "}
          </Text>
          <Text color="#253d4e">{"-$" + "0"}</Text>
        </Group>
        <Divider my="sm" variant="dashed" />
        <Group position="apart">
          <Text size="lg" weight={700} color="#253d4e">
            Shipping:{" "}
          </Text>
          <Text color="#253d4e">{"Free"}</Text>
        </Group>
        <Divider my="sm" variant="dashed" />

        <Group position="apart">
          <Text size="lg" weight={700} color="#253d4e">
            Estimated Tax:{" "}
          </Text>
          <Text color="#253d4e">{"$" + tax}</Text>
        </Group>
        <Divider my="sm" />
        <Group position="apart">
          <Text size="lg" weight={700} color="#253d4e">
            Total:{" "}
          </Text>
          <Text color="#253d4e">{"$" + (Number(tax) + Number(subTotal))}</Text>
        </Group>
        {/* <Button
          disabled
          leftIcon={<AiOutlineShoppingCart />}
          color="teal"
          style={{ width: "100%", marginTop: 10 }}
          onClick={onClick}
        >
          Checkout
        </Button> */}
        <div
          style={{
            maxWidth: "750px",
            marginTop: "20px",
          }}
        >
          <PayPalScriptProvider
            options={{
              "disable-funding": "card",
              "client-id": CLIENT_ID,
              components: "buttons",
              currency: "USD",
            }}
          >
            <ButtonWrapper
              cartdata={cartlist}
              amount={Number(tax) + Number(subTotal)}
              currency={"USD"}
              showSpinner={false}
            />
          </PayPalScriptProvider>
        </div>
      </Paper>
    </>
  );
}

export default CardTotal;
