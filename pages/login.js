import LoginPage from "@/components/LoginPage";
import Header from "../components/shards/Header";
import Footer from "../components/shards/Footer";
import CardItem from "../components/shards/CardItem";
import Category from "../components/shards/Category";
import BreadCrumb from "../components/shards/BreadCrumb";
import products from "@/lib/api/products";
import { Grid, Group } from "@mantine/core";
import BillingDetails from "@/components/BillingDetails";
const login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default login;
