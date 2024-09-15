import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTimersStore = create(
  persist(
    (set, get) => ({
      timers: [],

      // Agregar un nuevo temporizador
      addTimer: (timer) =>
        set((state) => ({
          timers: [
            ...state.timers,
            {
              ...timer,
              intervalId: null,
              initialMinutes: timer.minutes,
              initialSeconds: timer.seconds, // Guardamos los valores iniciales
            },
          ],
        })),

      // Actualizar un temporizador específico
      updateTimer: (timerKey, updatedTimer) => {
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.key === timerKey ? { ...updatedTimer } : timer
          ),
        }));
      },

      // Eliminar un temporizador
      removeTimer: (timerKey) =>
        set((state) => ({
          timers: state.timers.filter((timer) => timer.key !== timerKey),
        })),

      // Iniciar un temporizador
      startTimer: (key) => {
        const { timers } = get();

        const updatedTimers = timers.map((timer) => {
          if (timer.key === key) {
            if (timer.intervalId) return timer; // Ya está corriendo

            const intervalId = setInterval(() => {
              set((state) => {
                const updatedTimers = state.timers.map((t) => {
                  if (t.key === key) {
                    if (t.seconds === 0 && t.minutes === 0) {
                      clearInterval(t.intervalId);
                      alert("¡Tiempo terminado!");
                      return { ...t, intervalId: null };
                    } else if (t.seconds === 0) {
                      return { ...t, minutes: t.minutes - 1, seconds: 59 };
                    } else {
                      return { ...t, seconds: t.seconds - 1 };
                    }
                  }
                  return t;
                });
                return { timers: updatedTimers };
              });
            }, 1000);

            return { ...timer, intervalId };
          }
          return timer;
        });

        set({ timers: updatedTimers });
      },

      // Detener un temporizador
      stopTimer: (key) => {
        const { timers } = get();

        const updatedTimers = timers.map((timer) => {
          if (timer.key === key && timer.intervalId) {
            clearInterval(timer.intervalId); // Detenemos el timer
            return { ...timer, intervalId: null };
          }
          return timer;
        });

        set({ timers: updatedTimers });
      },
      // Reiniciar un temporizador
      resetTimer: (key) => {
        const { timers } = get();
        const updatedTimers = timers.map((timer) => {
          if (timer.key === key) {
            return {
              ...timer,
              minutes: timer.initialMinutes,
              seconds: timer.initialSeconds,
            };
          }
          return timer;
        });
        set({ timers: updatedTimers });
      },
    }),
    {
      name: "timers-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
