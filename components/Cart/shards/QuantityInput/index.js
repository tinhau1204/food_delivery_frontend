import { NumberInput } from "@mantine/core";
import React, { useState } from "react";

function QuantityInput({ onchangeValue, value }) {
  const [quantity, setQuantity] = useState(null);
  return (
    <NumberInput value={value} onChange={(e) => onchangeValue(e)} min={1} />
  );
}

export default QuantityInput;
