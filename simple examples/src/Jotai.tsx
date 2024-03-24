import { atom, useAtom } from "jotai";

const countAtom = atom<number>(0);

export const JotaiCounter = () => {
  const [count, updateCount] = useAtom(countAtom);
  return (
    <div>
      <h2>Jotai</h2>
      <span>{count}</span>
      <button onClick={() => updateCount(count + 1)}>one up</button>
    </div>
  );
};
