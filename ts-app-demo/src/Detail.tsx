import { useState } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useCart } from "./context/cartContext";
import toast from "react-hot-toast";
import { useGetProductById } from "./queries/productQueries";

export default function Detail() {
  const { setCart } = useCart();
  const { id } = useParams();
  const [sku, setSku] = useState("");

  const { data: product } = useGetProductById(id);

  if (!product || !id) return <PageNotFound />;

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
            toast("Added to cart", { icon: "🛒" });
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
