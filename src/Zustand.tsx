import { create } from "zustand";

// Or, can split into separate state and actions: https://docs.pmnd.rs/zustand/getting-started/comparison#redux
type Store = {
  count: number;
  inc: () => void;
};

const useStore = create<Store>()((set) => ({
  count: 1,
  // Could use useReducer here: https://docs.pmnd.rs/zustand/getting-started/comparison#redux
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export function ZustandCounter() {
  const { count, inc } = useStore();
  return (
    <div>
      <h2>Zustand</h2>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  );
}
