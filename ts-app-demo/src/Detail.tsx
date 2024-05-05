import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { cartAtom } from "./atoms/cartAtom";
import { useSetAtom } from "jotai";
import { Product } from "./types/types";

export default function Detail() {
  // Note that with useAtom this would trigger a render even though we only need the setter.
  // To test this, comment out the navigate call on line 45.
  const setItems = useSetAtom(cartAtom);
  // const [, setItems] = useAtom(cartAtom);
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState("");
  const { data: product, loading, error } = useFetch<Product>(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product || !id) return <PageNotFound />;
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
