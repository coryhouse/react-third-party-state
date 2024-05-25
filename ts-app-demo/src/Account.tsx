import { useSnapshot } from "valtio";
import { userState } from "./valtio/userState";

export function Account() {
  const { user } = useSnapshot(userState);

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
