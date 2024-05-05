import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useCart } from "./cartContext";
import { Product } from "./types/types";
import { useQuery } from "@tanstack/react-query";

export default function Detail() {
  const { setCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState("");

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_APP_API_BASE_URL + `products/${id}`
      );
      if (response.ok) return response.json() as unknown as Product;
      throw response;
    },
  });

  if (isLoading) return <Spinner />;
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
            if (!sku) return alert("Select size.");
            setCart((cart) => {
              const itemInCart = cart.find((i) => i.sku === sku);
              return itemInCart
                ? cart.map((i) =>
                    i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
                  )
                : [...cart, { id: parseInt(id), sku, quantity: 1 }];
            });
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
