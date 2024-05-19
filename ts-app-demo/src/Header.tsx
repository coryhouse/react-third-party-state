import { Link, NavLink } from "react-router-dom";
import { useStore } from "./store";

export default function Header() {
  const { cart, user, logOut, logIn } = useStore((store) => ({
    cart: store.cart,
    user: store.user,
    logOut: store.logOut,
    logIn: store.logIn,
  }));

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
              <button onClick={() => logOut()}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
