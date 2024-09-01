import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editTimer, deleteTimer } from "../Redux/localTimerSlice";

export default function EditChronos() {
  const timers = useSelector((state) => state.localTimers);
  const dispatch = useDispatch();
  const [editingTimer, setEditingTimer] = useState(null);

  function handleEdit(timer) {
    setEditingTimer({ ...timer });
  }

  function handleSave() {
    if (editingTimer) {
      dispatch(editTimer(editingTimer));
      setEditingTimer(null);
    }
  }

  function handleChange(e, field) {
    setEditingTimer({ ...editingTimer, [field]: e.target.value });
  }

  function handleDelete(timer) {
    dispatch(deleteTimer(timer.key));
  }
  return (
    <section>
      <h2>Choose one chrono to edit</h2>
      {timers.map((timer) => (
        <div key={timer.key}>
          {editingTimer && editingTimer.key === timer.key ? (
            <>
              <input
                value={editingTimer.name}
                onChange={(e) => handleChange(e, "name")}
              />
              <input
                type="number"
                value={editingTimer.minutes}
                onChange={(e) => handleChange(e, "minutes")}
              />
              <input
                type="number"
                value={editingTimer.seconds}
                onChange={(e) => handleChange(e, "seconds")}
              />
              <button onClick={() => handleSave()}>Save</button>
            </>
          ) : (
            <>
              <h1>{timer.name}</h1>
              <h2>{timer.minutes}</h2>
              <h2>{timer.seconds}</h2>
              <button onClick={() => handleEdit(timer)}>Edit</button>
            </>
          )}
          <button onClick={() => handleDelete(timer)}>Delete</button>
        </div>
      ))}
    </section>
  );
}
