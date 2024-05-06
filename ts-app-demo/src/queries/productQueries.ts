import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/types";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export function useGetProductById(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(baseUrl + `products/${id}`);
      if (response.ok) return response.json() as unknown as Product;
      throw response;
    },
  });
}

export function useGetProductsByCategory(category: string | undefined) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = await fetch(baseUrl + "products?category=" + category);
      if (response.ok) return response.json() as unknown as Product[];
      throw response;
    },
  });
}

export function useGetProductsById(productIds: number[]) {
  const url = new URL(baseUrl + "products");
  // Append search params to the URL for each cart item. Use Set to remove duplicate productIds.
  new Set([...productIds]).forEach((id) =>
    url.searchParams.append("id", id.toString())
  );

  return useQuery({
    queryKey: ["products", Object.fromEntries(url.searchParams)], // https://www.reddit.com/r/reactjs/comments/15vjwfc/comment/jx2r8v0/
    queryFn: async () => {
      const response = await fetch(url);
      if (response.ok) return response.json() as unknown as Product[];
      throw response;
    },
  });
}
