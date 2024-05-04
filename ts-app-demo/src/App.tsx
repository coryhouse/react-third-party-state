import "./App.css";
import Header from "./Header";
import Products from "./Products.tsx";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Faker from "./Faker.tsx";
import { CharacterCounter } from "./CharacterCounter.tsx";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/recoil" element={<CharacterCounter />} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/faker" element={<Faker />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
