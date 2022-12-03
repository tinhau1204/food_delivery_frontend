import LoginPage from "@/components/LoginPage";
import Header from "../components/shards/Header";
import Footer from "../components/shards/Footer";
import CardItem from "../components/shards/CardItem";
import Category from "../components/shards/Category";
import BreadCrumb from "../components/shards/BreadCrumb";
import products from "@/lib/api/products";
const login = () => {
  return (
    <>
      <Header />
      <BreadCrumb />
      {/* <LoginPage /> */}
      <Category />
      {products.map((item, index) => (
        <CardItem
          key={index}
          type={item.type}
          name={item.name}
          price={item.price}
          sale={item.sale}
          preSale={item.preSale}
          unit={item.unit}
          rating={item.rating}
        />
      ))}
      <Footer />
    </>
  );
};

export default login;
