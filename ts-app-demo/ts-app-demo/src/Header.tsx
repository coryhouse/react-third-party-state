import { Link, NavLink } from "react-router-dom";
import { useCart } from "./cartContext";

export default function Header() {
  const { items: cart } = useCart();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink to="/shoes">Shoes</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart ({cart.length})</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
