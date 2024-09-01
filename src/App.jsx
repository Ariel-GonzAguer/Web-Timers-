import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Root from "./components/Root/Root";
import HomePage from "./components/HomePage/HomePage";
import AddTimer from "./components/AddTimer/AddTimer";
import EditTimer from "./components/EditTimer/EditTimer";
import MyTimers from "./components/MyTimers/MyTimers";
import ActualTime from "./components/ActualTime/ActualTime";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="addTimer" element={<AddTimer />} />
        <Route path="editTimer" element={<EditTimer />} />
        <Route path="myTimers" element={<MyTimers />} />
        <Route path="actualTime" element={<ActualTime />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
