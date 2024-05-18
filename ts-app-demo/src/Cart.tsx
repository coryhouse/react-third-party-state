import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartContext";
import { useGetProductsById } from "./queries/productQueries";
import { CartItem } from "./CartItem";

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const { isLoading, data: products } = useGetProductsById(
    cart.map((i) => i.id)
  );

  if (isLoading || !products) return <Spinner />;

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
