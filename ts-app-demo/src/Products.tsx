import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useParams, Link } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Product } from "./types/types";

export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          import.meta.env.VITE_APP_API_BASE_URL + "products"
        );
        if (!data.ok) {
          throw new Error(`Product not found: ${data.status}`);
        }
        const products = await data.json();
        setProducts(products);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function renderProduct(p: Product) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  if (error) throw error;
  if (loading) return <Spinner />;
  if (!products || products.length === 0) return <PageNotFound />;

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
