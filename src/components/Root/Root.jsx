import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section>
      <div>
        <Outlet />
      </div>
      {location.pathname !== "/" && (
        <button onClick={() => navigate(-1)}>
          Go back!
        </button>
      )}
    </section>
  );
}
