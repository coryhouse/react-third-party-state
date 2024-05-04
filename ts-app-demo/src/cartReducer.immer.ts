/* This file uses Immer to handle state updates
   Note the it mutates the draft state instead of the state passed in.
   Immer returns a copy of the updated state, using the draft,
   so even though the code below mutates the draft, the state is 
   handled in an immutable friendly way. 👍
*/
import { produce } from "immer";
import { CartAction, CartItem } from "./types/types";

export default function cartReducer(cart: CartItem[], action: CartAction) {
  switch (action.type) {
    case "add": {
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      return produce(cart, (draft) => {
        if (itemInCart) {
          const itemIndex = draft.findIndex((i) => i.sku === sku);
          const item = draft[itemIndex];
          if (!item) throw new Error("Item not found in cart");
          item.quantity++;
        } else {
          draft.push({ id, sku, quantity: 1 });
        }
      });
    }
    case "updateQuantity": {
      const { quantity, sku } = action;

      return produce(cart, (draft) => {
        const index = cart.findIndex((i) => i.sku === sku);
        const item = draft[index];
        if (!item) throw new Error("Item not found in cart");
        if (quantity === 0) {
          delete draft[index];
        } else {
          item.quantity = quantity;
        }
      });
    }

    case "empty":
      return [];

    default:
      throw new Error("Unhandled action");
  }
}
