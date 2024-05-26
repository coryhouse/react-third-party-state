import { setup, assign, createActor } from "xstate";
import { CartItem } from "../types/types";

const cartMachine = setup({
    types: {
        context: {} as {
            cartItems: Array<CartItem>
        },
        events: {} as
            | { type: 'add'; message: string },
            | { type: 'empty' },
            | { type: 'updateQuantity' }
        }
    },
    actions: {
        addItem: (context) => {
            const itemInCart = context.cart.find((i) => i.sku === sku);
              return itemInCart
                ? cart.map((i) =>
                    i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
                  )
                : [...cart, { id: parseInt(id), sku, quantity: 1 }];
        }
    }).createMachine({
        context: {}
    })
  context: {
    cartItems: [],
  },
  on: {
    ADD_ITEM: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    REMOVE_ITEM: {
      actions: assign({
        count: ({ context }) => context.count - 1,
      }),
    },
    EMPTY_CART: {
      actions: assign({
        items: ({ event }) => event.value,
      }),
    },
  },
});

const cartActor = createActor(cartMachine).start();

cartActor.subscribe((state) => {
  console.log(state.context.count);
});

cartActor.send({ type: "INC" });
// logs 1
cartActor.send({ type: "DEC" });
// logs 0
cartActor.send({ type: "SET", value: 10 });
// logs 10
