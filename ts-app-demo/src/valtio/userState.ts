import { proxy } from "valtio";
import { User } from "../types/types";

type UserState = {
  user: User | null;
};

export const userState = proxy<UserState>({ user: null });

// Utility functions below here. Note that all these calls are mutative which we can safely do because Valtio uses a proxy.
export function logIn(user: User) {
  userState.user = user;
}

export function logOut() {
  userState.user = null;
}
