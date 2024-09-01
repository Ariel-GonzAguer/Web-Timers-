import React from "react";
import { NavLink } from "react-router-dom";

import ActualTime from "../ActualTime/ActualTime";

export default function HomePage() {
  return (
    <section>
      <div>My Timers</div>
      <div>Add Timer</div>
      <div>Edit Timer</div>
      <div>
        <ActualTime />
      </div>
    </section>
  );
}
