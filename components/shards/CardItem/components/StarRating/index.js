import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "classnames";
import { Text } from "@mantine/core";
export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [count, setCount] = useState(0);
  return (
    <div styles={styles.starRating}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <>
            <button
              type="button"
              key={index}
              className={clsx(
                index <= hover || index <= rating ? styles.on : styles.off,
                styles.Button,
              )}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className={styles.star}>&#9733;</span>
            </button>
          </>
        );
      })}
    </div>
  );
}

export function CountingStar({ count }) {
  return (
    <div styles={styles.starRating}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <>
            <button
              type="button"
              key={index}
              className={clsx(
                index <= count ? styles.on : styles.off,
                styles.Button,
              )}
              // onClick={() => setRating(index)}
              // onMouseEnter={() => setHover(index)}
              // onMouseLeave={() => setHover(rating)}
            >
              <span className={styles.star}>&#9733;</span>
            </button>
          </>
        );
      })}
    </div>
  );
}
