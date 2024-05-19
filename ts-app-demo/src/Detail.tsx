import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useCart } from "./context/cartContext";
import { Product } from "./types/types";
import toast from "react-hot-toast";

export default function Detail() {
  const { setCart } = useCart();
  const { id } = useParams();
  const [sku, setSku] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          import.meta.env.VITE_APP_API_BASE_URL + `products/${id}`
        );
        if (!data.ok) {
          throw new Error(`Product not found: ${data.status}`);
        }
        const product = await data.json();
        setProduct(product);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

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
