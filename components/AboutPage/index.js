import React from "react";
import styles from "./styles.module.scss";
function AboutPage() {
  console.log("user", JSON.parse(sessionStorage.getItem("user")));
  return (
    <>
      <div>AboutPage</div>
    </>
  );
}

export default AboutPage;
