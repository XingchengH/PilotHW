import { useState } from "react";
import initProducts from "../data";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductTable from "./table/ProductTable";
import AddProductForm from "./table/AddProductForm";
import AddProductFormUnControlled from "./table/AddProductFormUnControlled";
import { ProductContext } from "./store/Context";

export default function Table() {
  const [products, setProducts] = useState(initProducts);

  function handleDelete(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  function handleAddProduct(newProduct) {
    setProducts([...products, newProduct]);
  }

  return (
    <ProductContext.Provider
      value={{ products, handleAddProduct, handleDelete }}
    >
      <div className="container mt-4">
        <h1 className="text-center mb-4">Product List</h1>
        <ProductTable />
        {/* <AddProductForm/> */}
        <AddProductFormUnControlled />
      </div>
    </ProductContext.Provider>
  );
}
