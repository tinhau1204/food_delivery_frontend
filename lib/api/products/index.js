import AxiosCLient from "@/lib/axiosClient";

export async function getAllProducts(url) {
  // console.log('data',data);
  return await AxiosCLient.fetchingWithData("get", url);
}

const products = [
  {
    id: 1,
    name: "Ground allspice",
    sale: true,
    price: 24.0,
    preSale: 30.0,
    cate: "vegetable",
    unit: "kg",
    rating: "4",
    type: "new",
  },
  {
    id: 2,
    name: "Wash the carrot",
    sale: false,
    price: 24.0,
    cate: "vegetable",
    preSale: 24.0,
    unit: "kg",
    rating: "4",
    type: "",
  },
  {
    id: 3,
    name: "Boston",
    sale: true,
    price: 24.0,
    cate: "food",
    preSale: 30.0,
    unit: "kg",
    rating: "4",
    type: "hot",
  },
  {
    id: 4,
    name: "Boby Edamame c/m",
    sale: true,
    price: 24.0,
    preSale: 30.0,
    cate: "vegetable",
    unit: "kg",
    rating: "4",
    type: "sale",
  },
  {
    id: 5,
    name: "Kiwi Gold",
    sale: true,
    price: 24.0,
    preSale: 30.0,
    cate: "vegetable",
    unit: "kg",
    rating: "4",
    type: "",
  },
  {
    id: 6,
    name: "Mushroom Shiitake",
    sale: false,
    price: 24.0,
    cate: "vegetable",
    preSale: 30.0,
    unit: "kg",
    rating: "4",
    type: "sale",
  },
];

export default products;
