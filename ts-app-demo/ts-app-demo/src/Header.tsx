import { Link, NavLink } from "react-router-dom";
import { useSnapshot } from "valtio";
import { cartState } from "./cartState";

export default function Header() {
  const { items } = useSnapshot(cartState);
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
            <NavLink to="/cart">
              Cart (
              {items.reduce((prev, acc) => {
                return prev + acc.quantity;
              }, 0)}
              )
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
