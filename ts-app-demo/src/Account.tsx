import { useShoeStore } from "./shoeStore";

export function Account() {
  const user = useShoeStore((state) => state.user);

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
