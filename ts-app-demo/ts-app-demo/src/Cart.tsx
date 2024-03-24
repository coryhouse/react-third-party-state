import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { Product } from "./Detail";
import useFetch from "./services/useFetch";
import { useAtom } from "jotai";
import { Item, cartAtom } from "./atoms/cartAtom";

export default function Cart() {
  const [items, setItems] = useAtom(cartAtom);
  const navigate = useNavigate();
  const url = "products?" + items.map(({ id }) => "id=" + id).join("&");
  const { data: products, loading, error } = useFetch<Product[]>(url);

  function renderItem(itemInCart: Item, product: Product) {
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
                setItems((prev) =>
                  prev.map((i) =>
                    i.sku === sku
                      ? { ...i, quantity: parseInt(e.target.value) }
                      : i
                  )
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

  if (loading || !products) return <Spinner />;
  if (error) throw error;

  const numItemsInCart = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section id="cart">
      <h1>
        {numItemsInCart === 0
          ? "Your cart is empty"
          : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <ul>
        {items.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          if (!product) throw new Error("Product not found");
          return renderItem(cartItem, product);
        })}
      </ul>
      {items.length > 0 && (
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
