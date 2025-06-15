import React, { useState } from "react";
import { ProductContext } from "../Context/Context";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const { handleAddProduct, products } = React.useContext(ProductContext);

  function handleSubmit(e) {
    e.preventDefault();

    let trimmedPrice = price.trim();

    if (trimmedPrice.startsWith("$")) {
      trimmedPrice = trimmedPrice.slice(1).trim();
    }

    const priceNumber = parseFloat(trimmedPrice);

    if (!name.trim() || !category.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (isNaN(priceNumber) || priceNumber < 0) {
      alert("Please enter a valid positive price.");
      return;
    }

    const formattedPrice = `$${priceNumber.toFixed(2)}`;

    handleAddProduct({
      id: products.length + 1,
      name: name.trim(),
      category: category.trim(),
      price: formattedPrice,
    });

    setName("");
    setCategory("");
    setPrice("");
  }

  return (
    <div className="mt-4">
      <h3 className="text-center">Add Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-6 col-lg-3 mb-3 d-flex align-items-center">
            <label
              htmlFor="formName"
              className="me-3"
              style={{ whiteSpace: "nowrap" }}
            >
              Product Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="formName"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6 col-lg-3 mb-3 d-flex align-items-center">
            <label
              htmlFor="formCategory"
              className="me-3"
              style={{ whiteSpace: "nowrap" }}
            >
              Product Category:
            </label>
            <input
              type="text"
              className="form-control"
              id="formCategory"
              placeholder="Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col-md-6 col-lg-3 mb-3 d-flex align-items-center">
            <label
              htmlFor="formPrice"
              className="me-3"
              style={{ whiteSpace: "nowrap" }}
            >
              Product Price:
            </label>
            <input
              type="text"
              className="form-control"
              id="formPrice"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-6 col-lg-3 mb-3 d-flex">
            <button
              type="submit"
              className="btn btn-primary ms-auto align-self-end"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
