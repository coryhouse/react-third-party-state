import { useState, useRef, useEffect } from "react";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export default function useFetch<T>(url: string) {
  const isMounted = useRef(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    init();

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}

export function Fetch({ url, children }) {
  const { data, loading, error } = useFetch(url);
  return children(data, loading, error);
}
