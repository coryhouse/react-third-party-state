import "./App.css";
import Products from "./Products.tsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Detail from "./Detail.tsx";
import Cart from "./Cart.tsx";
import Checkout from "./Checkout.tsx";
import Faker from "./Faker.tsx";
import { Layout } from "./Layout.tsx";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<h1>Welcome to the store!</h1>} />
        <Route
          path="/:category"
          element={<Products />}
          errorElement={<h1>Sorry, failed to load products.</h1>}
        />
        <Route path="/:category/:id" element={<Detail />} />
        <Route
          path="/cart"
          element={<Cart />}
          errorElement={<h1>Sorry, an error occurred on cart.</h1>}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/faker" element={<Faker />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
