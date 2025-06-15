import { useContext } from "react";
import ProductRow from "./ProductRow";
import { ProductContext } from "../context/Context";
export default function ProductTable() {
  const { products } = useContext(ProductContext);

  return (
    <table className="table table-striped table-bordered table-hover table-sm text-center">
      <thead className="bg-dark text-white">
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Product Category</th>
          <th scope="col">Product Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product}/>
        ))}
      </tbody>
    </table>
  );
}