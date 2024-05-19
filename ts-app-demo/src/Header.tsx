import { Link, NavLink } from "react-router-dom";
import { useSnapshot } from "valtio";
import { cartState } from "./valtio/cartState";
import { logIn, logOut, userState } from "./valtio/userState";

export default function Header() {
  const { cart } = useSnapshot(cartState);
  const { user } = useSnapshot(userState);

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
              {cart.reduce((prev, acc) => {
                return prev + acc.quantity;
              }, 0)}
              )
            </NavLink>
          </li>
          <li>
            {user ? (
              <NavLink to="/account">Account</NavLink>
            ) : (
              <button
                onClick={() => logIn({ id: 1, email: "cory@example.com" })}
              >
                Log in
              </button>
            )}
          </li>
          {user && (
            <li>
              <button onClick={logOut}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
