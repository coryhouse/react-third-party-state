import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { userState } from "./valtio/userState";

export function Account() {
  const { user } = useSnapshot(userState);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return;
  }

  return (
    <>
      <h1>Account</h1>
      <p>Email: {user.email}</p>
    </>
  );
}
