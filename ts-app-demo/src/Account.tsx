import { useUser } from "./shoeStore";

export function Account() {
  const user = useUser();

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
