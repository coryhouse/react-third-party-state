import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "./atoms/userAtom";

export function Account() {
  const [user] = useAtom(userAtom);

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
