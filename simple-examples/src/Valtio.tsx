import { proxy, useSnapshot } from "valtio";

const state = proxy({ count: 0 });

export function ValtioCounter() {
  const { count } = useSnapshot(state);
  return (
    <div>
      <h2>Valtio</h2>
      <span>{count}</span>
      <button onClick={() => (state.count += 1)}>one up</button>
    </div>
  );
}
