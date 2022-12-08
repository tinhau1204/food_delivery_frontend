import { NumberInput } from "@mantine/core";
import React from "react";

function QuantityInput({ value }) {
  return <NumberInput value={value} onChange={(e) => console.log(e)} min={1} />;
}

export default QuantityInput;
