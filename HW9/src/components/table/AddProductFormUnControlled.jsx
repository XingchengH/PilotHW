import React, { useRef } from "react";
import { ProductContext } from "../Table";

export default function AddProductFormUnControlled() {
  const { handleAddProduct, products } = React.useContext(ProductContext);

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    let trimmedPrice = priceRef.current.value.trim();
    if (trimmedPrice.startsWith("$")) {
      trimmedPrice = trimmedPrice.slice(1).trim();
    }

    const priceNumber = parseFloat(trimmedPrice);
    if (!nameRef.current.value.trim() || !categoryRef.current.value.trim()) {
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
      name: nameRef.current.value.trim(),
      category: categoryRef.current.value.trim(),
      price: formattedPrice,
    });
    nameRef.current.value = "";
    categoryRef.current.value = "";
    priceRef.current.value = "";
  };

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
              ref={nameRef}
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
              ref={categoryRef}
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
              ref={priceRef}
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
