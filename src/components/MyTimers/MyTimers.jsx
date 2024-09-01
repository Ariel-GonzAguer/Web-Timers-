import React from "react";
import { useSelector } from "react-redux";

export default function MyChronos() {
  const timers = useSelector((state) => state.localTimers);
  return (
    <section>
      {timers.map((timer) => (
        <div key={timer.key}>
          <h1>{timer.name}</h1>
          <h2>{timer.minutes}</h2>
          <h2>{timer.seconds}</h2>
          <button>Start</button>
          <button>Stop</button>
        </div>
      ))}
    </section>
  );
}
