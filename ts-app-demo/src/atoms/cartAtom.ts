import { CartItem } from "../types/types";
import { atomWithStorage } from "jotai/utils";

let initialCart: CartItem[] = [];

export const cartAtom = atomWithStorage("jotai-cart", initialCart);
