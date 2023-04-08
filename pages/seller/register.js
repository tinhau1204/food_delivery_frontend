import React from "react";
import MyStoreRegisterPage from "@/components/MyStoreRegisterPage";
import RegisterPage from "@/components/RegisterPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const sellerregister = () => {
  return (
    <>
      <MyStoreRegisterPage />
    </>
  );
};

export default sellerregister;
