import React, { useState } from "react";
import { useTimersStore } from "../Zustand/store";
import { toast, Toaster } from "sonner";

export default function EditChronos() {
  const timers = useTimersStore((state) => state.timers);
  const updateTimer = useTimersStore((state) => state.updateTimer);
  const removeTimer = useTimersStore((state) => state.removeTimer);

  const [editingTimer, setEditingTimer] = useState(null);
  const [errors, setErrors] = useState({});

  function handleEdit(timer) {
    setEditingTimer({ ...timer });
    setErrors({});
  }

  function validateTimer(timer) {
    const newErrors = {};
    if (!timer.name.trim()) {
      newErrors.name = "Name cannot be empty";
    }
    if (timer.minutes < 0) {
      newErrors.minutes = "Minutes must be a positive number";
    }
    if (timer.seconds < 0) {
      newErrors.seconds = "Seconds must be a positive number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (editingTimer) {
      const updatedTimer = {
        ...editingTimer,
        name: editingTimer.name.trim(),
        minutes: parseInt(editingTimer.minutes) || 0,
        seconds: parseInt(editingTimer.seconds) || 0,
      };

      if (validateTimer(updatedTimer)) {
        updateTimer(updatedTimer.key, updatedTimer);
        setEditingTimer(null);
        toast.success(`Timer ${updatedTimer.name} updated successfully`);
      } else {
        const errorMessages = Object.values(errors).join(". ");
        toast.error(`Please correct the following errors: ${errorMessages}`);
      }
    }
  }

  function handleChange(e, field) {
    const value = e.target.value;
    setEditingTimer({ ...editingTimer, [field]: value });
    // Validate the field as the user types
    validateField(field, value);
  }

  function validateField(field, value) {
    let fieldError = "";
    if (field === "name" && !value.trim()) {
      fieldError = "Name cannot be empty";
    } else if ((field === "minutes" || field === "seconds") && (parseInt(value) < 0 || isNaN(parseInt(value)))) {
      fieldError = `${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number`;
    }
    setErrors(prev => ({ ...prev, [field]: fieldError }));
  }

  function handleDelete(timer) {
    removeTimer(timer.key);
    toast.success(`Timer ${timer.name} deleted successfully`);
  }

  return (
    <section>
      <h2>Choose one chrono to edit</h2>
      {timers.map((timer) => (
        <div key={timer.key}>
          {editingTimer && editingTimer.key === timer.key ? (
            <>
              <div>
                <input
                  value={editingTimer.name}
                  onChange={(e) => handleChange(e, "name")}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={editingTimer.minutes}
                  onChange={(e) => handleChange(e, "minutes")}
                />
                {errors.minutes && <span className="error">{errors.minutes}</span>}
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={editingTimer.seconds}
                  onChange={(e) => handleChange(e, "seconds")}
                />
                {errors.seconds && <span className="error">{errors.seconds}</span>}
              </div>
              <button onClick={handleSave}>Save</button>
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
      <Toaster />
    </section>
  );
}