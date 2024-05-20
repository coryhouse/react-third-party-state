import { Link, NavLink } from "react-router-dom";
import { logIn, logOut, useCartCount, useUser } from "./shoeStore";

export default function Header() {
  const user = useUser();
  const cartCount = useCartCount();

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
            <NavLink to="/cart">Cart ({cartCount})</NavLink>
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
