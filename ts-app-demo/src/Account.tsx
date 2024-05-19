import { useNavigate } from "react-router-dom";
// NOTE: Do NOT import from zustand. Import OUR store instead.
import { useStore } from "./store";

export function Account() {
  const { user } = useStore();
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
