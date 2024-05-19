// NOTE: Do NOT import from zustand. Import OUR store instead.
import { useStore } from "./store";

export function Account() {
  const { user } = useStore((store) => ({ user: store.user }));

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
