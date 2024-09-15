import React from "react";
import { NavLink } from "react-router-dom";

import ActualTime from "../ActualTime/ActualTime";


export default function HomePage() {

  return (
    <section>
      <ul>
        <li>
          <NavLink to={"myTimers"}>My Timers</NavLink>
        </li>
        <li>
          <NavLink to={"addTimer"}>Add Timer</NavLink>
        </li>
        <li>
          <NavLink to={"editTimer"}>Edit Timer</NavLink>
        </li>
      </ul>

      <div>
        <ActualTime />
      </div>

    </section>
  );
}
