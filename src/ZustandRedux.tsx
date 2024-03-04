import { create } from "zustand";
import { redux } from "zustand/middleware";

type State = {
  count: number;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

type Action = {
  type: keyof Actions;
  qty: number;
};

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.qty };
    case "decrement":
      return { count: state.count - action.qty };
    default:
      return state;
  }
};

const initialState = { count: 0 };

// Create a Redux-like setup via Zustand's Redux middleware: https://docs.pmnd.rs/zustand/guides/flux-inspired-practice#redux-like-patterns
const useReduxStore = create(redux(countReducer, initialState));

export function ZustandReduxCounter() {
  const { count, dispatch } = useReduxStore();
  return (
    <div>
      <h2>Zustand Redux</h2>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: "increment", qty: 1 })}>
        one up
      </button>
    </div>
  );
}
