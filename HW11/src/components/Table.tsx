import { useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const initialProduct: Product[] = [
  { id: 1, name: "M&M", category: "Snacks", price: 1.99 },
  { id: 2, name: "Table", category: "Furniture", price: 199 },
  { id: 3, name: "Kale", category: "Vegetables", price: 2.49 },
];

export default function Table() {
  const [err, setErr] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProduct);
  const [inputData, setInputData] = useState<Product>({
    id: products.length + 1,
    name: "",
    category: "",
    price: 0,
  });

  const keys =
    products.length > 0 ? (Object.keys(products[0]) as (keyof Product)[]) : [];

  const deleteHandler = (id: number): void => {
    setProducts((prev) => prev.filter((product) => id !== product.id));
  };

  const addHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!inputData.name || !inputData.category || !inputData.price) {
      alert("Please enter valid product details");
      setErr(true);
      return;
    }

    const newProduct: Product = {
      ...inputData,
      id: products.length + 1,
    };

    setProducts((prev) => [...prev, newProduct]);

    setInputData({
      id: products.length + 1,
      name: "",
      category: "",
      price: 0,
    });
  };

  return (
    <div className="container mt-5">
      <table className="table table-striped border shadow text-center">
        <caption>Product Table</caption>
        <thead>
          <tr>
            <th scope="row">id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Category</th>
            <th scope="col">Product Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => (
              <tr key={product.id}>
                {keys.map((key) => {
                  if (key === "id") {
                    return <th scope="row">{product.id}</th>;
                  }
                  if (key === "price") {
                    return <td key={key}>${product.price.toFixed(2)}</td>;
                  }
                  return (
                    <td key={key}>{product[key as keyof typeof product]}</td>
                  );
                })}
                <td>
                  <button
                    className="btn btn-sm btn-outline-light text-dark rounded-2 shadow"
                    onClick={() => deleteHandler(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <form action="">
        <div className="form-group mb-3">
          <label htmlFor="product-name">Product Name: </label>
          <input
            type="text"
            className="form-control"
            id="product-name"
            value={inputData.name}
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="product-category">Product Category</label>
          <input
            type="text"
            className="form-control"
            id="product-category"
            value={inputData.category}
            onChange={(e) =>
              setInputData({ ...inputData, category: e.target.value })
            }
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="product-price">Product Price:</label>
          <input
            type="text"
            className="form-control"
            id="product-price"
            value={inputData.price}
            onChange={(e) =>
              setInputData({
                ...inputData,
                price: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
        <button
          className="btn btn-light btn-outline-none btn-secondary text-dark rounded-2 shadow w-100"
          onClick={addHandler}
        >
          Add New Product
        </button>
      </form>
    </div>
  );
}
