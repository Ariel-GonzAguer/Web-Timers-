import React, { useEffect, useState } from "react";

export default function ActualTime() {
  const [actualTIme, setActualTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setActualTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {actualTIme}
    </section>
  );
}
