import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartContext";
import { CartItem, Product } from "./types/types";
import { useQuery } from "@tanstack/react-query";

export default function Cart() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", cart],
    queryFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_APP_API_BASE_URL +
          "products?" +
          cart.map(({ id }) => "id=" + id).join("&")
      );
      if (response.ok) return response.json() as unknown as Product[];
      throw response;
    },
  });

  function renderItem(itemInCart: CartItem, product: Product) {
    const { sku, quantity } = itemInCart;
    const { name, image, skus, price } = product;
    const matchingSku = skus.find((s) => s.sku === sku);
    if (!matchingSku) throw new Error("Sku not found");
    const { size } = matchingSku;

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => {
                const quantity = parseInt(e.target.value);
                setCart(
                  quantity === 0
                    ? cart.filter((i) => i.sku !== sku)
                    : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i))
                );
              }}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (isLoading || !products) return <Spinner />;
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
          return renderItem(cartItem, product);
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
