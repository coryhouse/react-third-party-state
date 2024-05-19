// NOTE: Do NOT import from zustand. Import OUR store instead.
import { useStore } from "./shoeStore";

export function Account() {
  const user = useStore((state) => state.user);

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
