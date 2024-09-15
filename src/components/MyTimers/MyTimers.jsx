import React, { useState, useEffect } from "react";
import { useTimersStore } from "../Zustand/store";
import { toast, Toaster } from "sonner";

import retroAlamar from "../../../public/sounds/retroAlarm.wav";

export default function MyChronos() {
  const timers = useTimersStore((state) => state.timers); // Selector de la store

  // Estado local que contiene copias de los timers de la store
  const [localTimers, setLocalTimers] = useState(() =>
    timers.map((timer) => ({
      key: timer.key,
      name: timer.name,
      minutes: timer.minutes,
      seconds: timer.seconds,
      initialMinutes: timer.initialMinutes,
      initialSeconds: timer.initialSeconds,
      intervalId: null, // Para gestionar el temporizador localmente
    }))
  );

  // Estado para gestionar la reproducción del sonido
  const [playSound, setPlaySound] = useState(false);
  const audioRef = React.useRef(null);
  const [toastId, setToastId] = useState(null); // Estado para almacenar el ID del toast

  // Actualizar el estado local cuando los timers de la store cambien
  useEffect(() => {
    setLocalTimers(
      timers.map((timer) => ({
        key: timer.key,
        name: timer.name,
        minutes: timer.minutes,
        seconds: timer.seconds,
        initialMinutes: timer.minutes,
        initialSeconds: timer.seconds,
        intervalId: null,
      }))
    );
  }, [timers]);

  // Reproduce el sonido cuando se establece playSound en true
  useEffect(() => {
    if (playSound && audioRef.current) {
      audioRef.current.play();
      setPlaySound(false);
    }
  }, [playSound]);

  // Función para iniciar el temporizador localmente
  const startTimer = (key) => {
    setLocalTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.key === key) {
          if (timer.intervalId) return timer; // Si ya está corriendo, no hacer nada

          const intervalId = setInterval(() => {
            setLocalTimers((currentTimers) =>
              currentTimers.map((currentTimer) => {
                if (currentTimer.key === key) {
                  // Si el temporizador llega a 0:0, detenemos el intervalo
                  if (
                    currentTimer.minutes === 0 &&
                    currentTimer.seconds === 0
                  ) {
                    clearInterval(currentTimer.intervalId); // Detenemos el temporizador
                    setToastId(
                      toast("¡Tiempo terminado!", {
                        duration: 10000, // Duración del toast (en milisegundos)
                        onDismiss: () => {
                          // Detener el sonido cuando el toast se cierra
                          if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0; // Reiniciar el tiempo de reproducción
                          }
                        },
                      })
                    );
                    setPlaySound(true);
                    return {
                      ...currentTimer,
                      intervalId: null,
                      minutes: currentTimer.initialMinutes, // Restablece los valores iniciales
                      seconds: currentTimer.initialSeconds,
                    };
                  }

                  // Lógica para reducir segundos y minutos correctamente
                  if (currentTimer.seconds === 0) {
                    return {
                      ...currentTimer,
                      minutes: currentTimer.minutes - 1,
                      seconds: 59,
                    };
                  } else {
                    return {
                      ...currentTimer,
                      seconds: currentTimer.seconds - 1,
                    };
                  }
                }
                return currentTimer;
              })
            );
          }, 1000);

          return { ...timer, intervalId };
        }
        return timer;
      })
    );
  };

  // Función para detener el temporizador localmente y volver a tiempo inicial
  const stopTimer = (key) => {
    setLocalTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.key === key && timer.intervalId) {
          clearInterval(timer.intervalId);
          return {
            ...timer,
            intervalId: null, // Detenemos el temporizador
            minutes: timer.minutes, // Volvemos al tiempo inicial
            seconds: timer.seconds,
          };
        }
        return timer;
      })
    );
  };

  // Función para resetear el temporizador localmente
  const resetTimer = (key) => {
    setLocalTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.key === key
          ? {
              ...timer,
              minutes: timer.initialMinutes, // Restablece los valores iniciales
              seconds: timer.initialSeconds,
            }
          : timer
      )
    );
  };

  return (
    <section>
      <audio ref={audioRef} src={retroAlamar} />
      <Toaster position="top-center" richColors closeButton />
      {localTimers.map((timer) => (
        <div key={timer.key}>
          <h1>{timer.name}</h1>
          <h2>
            {timer.minutes !== undefined ? timer.minutes : "00"} :{" "}
            {timer.seconds !== undefined
              ? timer.seconds < 10
                ? `0${timer.seconds}`
                : timer.seconds
              : "00"}
          </h2>
          <button onClick={() => startTimer(timer.key)}>Start</button>
          <button onClick={() => stopTimer(timer.key)}>Stop</button>
          <button onClick={() => resetTimer(timer.key)}>Reset</button>
        </div>
      ))}
    </section>
  );
}
