import { Link, NavLink } from "react-router-dom";
import { useShoeStore } from "./shoeStore";

export default function Header() {
  // Note: This is NOT optimized. It will re-render on every store change.
  // But since this component is basically using the entire store, a selector won't help.
  const { cart, user, logOut, logIn } = useShoeStore();

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
