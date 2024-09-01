import { configureStore } from "@reduxjs/toolkit"
import localTimersReducer from "./localTimerSlice"

const store = configureStore({
  reducer: {
    localTimers: localTimersReducer
  }
})

export default store
