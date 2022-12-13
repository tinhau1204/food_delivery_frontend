import {
  Group,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  Text,
} from "@mantine/core";
import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import { getCart, addToCart } from "@/redux/cart";
import { useSelector, useDispatch } from "react-redux";
function SelectDetail({ onclickquantity, onclickweight }) {
  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(1);
  /**@type import("react").MutableRefObject<NumberInputHandlers> */
  const handlersQuantity = useRef();
  /**@type import("react").MutableRefObject<NumberInputHandlers> */
  const handlersWeight = useRef();
  return (
    <Group>
      <Text> Quantity:</Text>
      <Group spacing={5}>
        <ActionIcon
          size={42}
          variant="default"
          className={styles.buttonAction}
          onClick={(item) => {
            handlersQuantity.current.decrement();
          }}
        >
          –
        </ActionIcon>

        <NumberInput
          hideControls
          value={quantity}
          onChange={(val) => {
            setQuantity(val);
            onclickquantity(val);
          }}
          handlersRef={handlersQuantity}
          max={10}
          min={0}
          step={1}
          styles={{
            input: {
              width: 50,
              height: 42,
              textAlign: "center",
              borderColor: "#27ca7d",
            },
          }}
        />

        <ActionIcon
          size={42}
          variant="default"
          className={styles.buttonAction}
          onClick={() => handlersQuantity.current.increment()}
        >
          +
        </ActionIcon>
      </Group>

      {/* <Text> Weight/Size (kg):</Text>
        <Group spacing={5}>
            <ActionIcon size={42} variant="default" className={styles.buttonAction} onClick={() => handlersWeight.current.decrement()}>
                –
            </ActionIcon>

            <NumberInput
                hideControls
                value={weight}
                onChange={(val) => {
                    setWeight(val);
                    onclickweight(val);
                }}
                handlersRef={handlersWeight}
                max={10}
                min={0}
                step={1}
                styles={{ input: { width: 50, height: 42,textAlign: 'center', borderColor: '#27ca7d'} }}
            />

            <ActionIcon size={42} variant="default" className={styles.buttonAction} onClick={() => handlersWeight.current.increment()}>
                +
            </ActionIcon>
        </Group> */}
    </Group>
  );
}

export default SelectDetail;
