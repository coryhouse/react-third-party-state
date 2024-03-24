import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { cartAtom } from "./atoms/cartAtom";
import { useAtom } from "jotai";

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  skus: Sku[];
};

type Sku = {
  sku: string;
  size: number;
};

export default function Detail() {
  const [, setItems] = useAtom(cartAtom);
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState("");
  const { data: product, loading, error } = useFetch<Product>(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>

      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            setItems((prev) => [...prev, { id: product.id, sku, quantity: 1 }]);
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
