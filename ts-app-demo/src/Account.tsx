import { useNavigate } from "react-router-dom";
import { useUser } from "./context/userContext";

export function Account() {
  const { user } = useUser();
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
