import React, { useState } from "react";
import { v4 as randomUUID } from "uuid";
import { toast, Toaster } from "sonner";

import { useTimersStore } from "../Zustand/store";

export default function AddTimer() {
  const addTimerToStore = useTimersStore((state) => state.addTimer);

  const [newTimer, setNewTimer] = useState({
    name: "",
    minutes: "",
    seconds: "",
  });

  function validateTimer(timer) {
    if (!timer.name.trim()) {
      return "El nombre del temporizador no puede estar vacío";
    }
    if (isNaN(timer.minutes) || timer.minutes < 0) {
      return "Los minutos deben ser un número positivo";
    }
    if (isNaN(timer.seconds) || timer.seconds < 0 || timer.seconds > 59) {
      return "Los segundos deben ser un número entre 0 y 59";
    }
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const timerToAdd = {
      name: newTimer.name.trim(),
      minutes: parseInt(newTimer.minutes) || 0,
      seconds: parseInt(newTimer.seconds) || 0,
      key: randomUUID(),
    };

    const error = validateTimer(timerToAdd);
    if (error) {
      toast.error(
        `${error}`,
      );
      return;
    }

    addTimerToStore(timerToAdd);
    toast.success(
      `Timer ${timerToAdd.name} created successfully`,
    );
    setNewTimer({
      name: "",
      minutes: "",
      seconds: "",
    });
  }

  return (
    <section>
      <Toaster richColors position="bottom-center" closeButton />
      <h1>Create a new timer</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Timer Name</label>
        <input
          type="text"
          id="name"
          value={newTimer.name}
          onChange={(e) => {
            setNewTimer({ ...newTimer, name: e.target.value });
          }}
        />
        <label htmlFor="seconds"> Timer Seconds</label>
        <input
          type="number"
          id="seconds"
          value={newTimer.seconds}
          onChange={(e) => {
            setNewTimer({ ...newTimer, seconds: e.target.value });
          }}
        />
        <label htmlFor="minutes"> Timer Minutes</label>
        <input
          type="number"
          id="minutes"
          value={newTimer.minutes}
          onChange={(e) => {
            setNewTimer({ ...newTimer, minutes: e.target.value });
          }}
        />
        <button type="submit">Add Timer</button>
      </form>
    </section>
  );
}
