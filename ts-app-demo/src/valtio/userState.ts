import { User } from "../types/types";
import { proxy } from "valtio";

type UserState = {
  user: User | null;
};

export const userState = proxy<UserState>({ user: null });

export function logIn(user: User) {
  userState.user = user;
}

export function logOut() {
  userState.user = null;
}
