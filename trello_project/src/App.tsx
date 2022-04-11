import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hoursState = useRecoilValue(hourSelector);

  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  return (
    <>
      <input
        value={minutes}
        onChange={onMinuteChange}
        type="number"
        placeholder="Minutes"
      />
      <input value={hoursState} type="number" placeholder="Hours" />
    </>
  );
}

export default App;
