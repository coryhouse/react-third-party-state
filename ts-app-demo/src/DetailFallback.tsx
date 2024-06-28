import { FallbackProps } from "react-error-boundary";
import PageNotFound from "./PageNotFound";

export function DetailFallback(props: FallbackProps) {
  return props.error.status === 404 ? (
    <PageNotFound />
  ) : (
    <h1>Something went wrong.</h1>
  );
}
