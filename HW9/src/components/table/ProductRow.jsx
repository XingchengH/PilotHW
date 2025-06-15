import React, { useContext } from "react";
import { ProductContext } from "../Context/Context";
export default function ProductRow({ product }) {
  const { handleDelete } = useContext(ProductContext);
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
