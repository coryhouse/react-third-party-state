import { useCartStore } from "./cartStore";
import { CartItem as CartItemType, Product } from "./types/types";

type CartItemProps = {
  cartItem: CartItemType;
  product: Product;
};

export function CartItem({ cartItem, product }: CartItemProps) {
  const { updateCartQuantity } = useCartStore();
  const { sku, quantity } = cartItem;
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
              updateCartQuantity(sku, parseInt(e.target.value));
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
