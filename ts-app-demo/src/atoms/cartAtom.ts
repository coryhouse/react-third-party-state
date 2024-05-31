import { atom } from "jotai";
import { CartItem } from "../types/types";

export const cartAtom = atom<CartItem[]>([]);
