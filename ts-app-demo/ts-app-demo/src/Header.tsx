import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "./cartContext";

const activeStyle = {
  color: "purple",
};

export default function Header() {
  const cart = useCart();
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
            <NavLink to="/shoes">
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              Cart ({cart.length})
            </NavLink=>
          </li>
        </ul>
      </nav>
    </header>
  );
}
