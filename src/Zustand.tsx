import { create } from "zustand";

// Or, can split into separate state and actions: https://docs.pmnd.rs/zustand/getting-started/comparison#redux
// Can declare actions as plain functions outside the store too: https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions
type Store = {
  count: number;
  inc: () => void;
};

// Only TypeScript requires the odd extra set of parens here. The curried workaround is necessary for type safety. https://docs.pmnd.rs/zustand/guides/typescript
const useStore = create<Store>()((set) => ({
  count: 1,
  // Could use useReducer here: https://docs.pmnd.rs/zustand/getting-started/comparison#redux
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export function ZustandCounter() {
  // The selector on the right is optional. And can auto-generate via a complex type: https://docs.pmnd.rs/zustand/guides/auto-generating-selectors
  const { count, inc } = useStore((state) => ({
    count: state.count,
    inc: state.inc,
  }));
  return (
    <div>
      <h2>Zustand</h2>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  );
}
