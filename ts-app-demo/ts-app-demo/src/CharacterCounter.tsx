import { useRecoilState, useRecoilValue } from "recoil";
import { charCountState, textState } from "./atoms/atoms";

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

export function TextInput() {
  const [text, setText] = useRecoilState(textState);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      Echo: {text}
    </div>
  );
}
