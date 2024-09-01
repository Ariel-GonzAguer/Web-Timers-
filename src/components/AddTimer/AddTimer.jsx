import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTimer } from "../Redux/localTimerSlice";
import { nanoid } from "@reduxjs/toolkit";

export default function AddTimer() {
  const [timerName, setTimerName] = useState("");
  const [timerseconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const dispatch = useDispatch();

  return (
    <section>
      <h1>Create a new timer</h1>
      <form>
        <label htmlFor="name"> Timer Name</label>
        <input
          type="text"
          id="name"
          value={timerName}
          onChange={(e) => setTimerName(e.target.value)}
        />
        <label htmlFor="seconds"> Timer Seconds</label>
        <input
          type="number"
          id="seconds"
          value={timerseconds}
          onChange={(e) => setTimerSeconds(e.target.value)}
        />
        <label htmlFor="minutes"> Timer Minutes</label>
        <input
          type="number"
          id="minutes"
          value={timerMinutes}
          onChange={(e) => setTimerMinutes(e.target.value)}
        />
        <input
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              addNewTimer({
                key: nanoid(),
                name: timerName,
                seconds: timerseconds,
                minutes: timerMinutes,
              })
            );
            setTimerName("");
            setTimerSeconds(0);
            setTimerMinutes(0);
          }}
        />
      </form>
    </section>
  );
}
