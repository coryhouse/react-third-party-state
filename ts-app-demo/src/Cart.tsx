import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartContext";
import { Product } from "./types/types";
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url =
          import.meta.env.VITE_APP_API_BASE_URL +
          "products?" +
          cart.map(({ id }) => "id=" + id).join("&");
        const data = await fetch(url);
        if (!data.ok) {
          throw new Error(`Product not found: ${data.status}`);
        }
        const products = await data.json();
        setProducts(products);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || !products) return <Spinner />;
  if (error) throw error;

  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section id="cart">
      <h1>
        {numItemsInCart === 0
          ? "Your cart is empty"
          : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <ul>
        {cart.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          if (!product) throw new Error("Product not found");
          return (
            <CartItem
              key={cartItem.id + cartItem.sku}
              cartItem={cartItem}
              product={product}
            />
          );
        })}
      </ul>
      {cart.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
