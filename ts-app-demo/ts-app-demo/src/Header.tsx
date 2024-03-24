import { Link, NavLink } from "react-router-dom";
import { cartAtom } from "./atoms/cartAtom";
import { useAtom } from "jotai";

export default function Header() {
  const [cart] = useAtom(cartAtom);
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
