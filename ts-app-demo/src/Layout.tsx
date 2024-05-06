import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="content">
      <Header />
      <main>
        <ErrorBoundary
          fallback={<h1>Sorry, an error occurred above routes.</h1>}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
